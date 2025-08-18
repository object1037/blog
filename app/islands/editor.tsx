import { css } from 'hono/css'
import { useEffect, useRef, useState } from 'hono/jsx'
import { ChevronRight, CloudUpload } from 'lucide'
import { LucideIcon } from '../components/lucideIcon'
import { highlight, initHighlighter } from '../lib/highlight.client'

const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Tab') {
    document.execCommand('insertHTML', false, '  ')
    e.preventDefault()
  }
}

export const Editor = ({ initialValue = '' }: { initialValue?: string }) => {
  const codeBlockRef = useRef<HTMLElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [content, setContent] = useState(initialValue)

  useEffect(() => {
    initHighlighter()
    updateTextareaHeight()
  }, [])

  useEffect(() => {
    highlight(codeBlockRef.current, content, 'markdown')
  }, [content])

  const updateTextareaHeight = () => {
    const target = textareaRef.current
    if (!target) return
    target.style.height = 'auto'
    target.style.height = `${target.scrollHeight}px`
  }

  const container = css`
    position: relative;
    width: 100%;
    height: 48rem;
    overflow: auto;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    &:has(textarea:focus-visible) {
      border-color: #a3a3a3;
    }
    transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  `
  const editorCommonStyle = css`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  `
  const preStyle = css`
    ${editorCommonStyle}
    pointer-events: none;
  `
  const editorStyle = css`
    ${editorCommonStyle}
    background: transparent;
    color: transparent;
    caret-color: black;
    resize: none;
    overflow: hidden;
    &:focus-visible {
      outline: none;
    }
  `
  const buttonContainer = css`
    position: absolute;
    left: 50%;
    top: 0.75rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `
  const buttonStyle = css`
    font-size: 1.25rem;
    padding: 0.625rem;
    border-radius: 50%;
    border: 1px solid #a3a3a3;
    cursor: pointer;
    background-color: #fafafa;
    &:hover {
      background-color: #a3a3a3;
      color: #fafafa;
    }
    transition-property: background-color color border-color;
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  `
  const submitBStyle = css`
    ${buttonStyle}
    &:hover {
      background-color: #171717;
      border-color: #171717;
      color: #fafafa;
    }
  `

  const submitHandler = (e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement, e.submitter)
    const action = formData.get('action')
    if (
      action === 'submit' &&
      !window.confirm('Are you sure you want to submit?')
    ) {
      e.preventDefault()
    }
  }

  return (
    <form
      method="post"
      action="/new"
      onSubmit={(e) => submitHandler(e as SubmitEvent)}
    >
      <div class={container}>
        <pre ref={codeBlockRef} class={preStyle}>
          {content}
        </pre>
        <textarea
          name="content"
          value={content}
          ref={textareaRef}
          onChange={(e) => {
            setContent((e.target as HTMLTextAreaElement).value)
            updateTextareaHeight()
          }}
          onKeyDown={handleKeydown}
          class={editorStyle}
        />
      </div>
      <div class={buttonContainer}>
        <button type="submit" name="action" value="submit" class={submitBStyle}>
          <LucideIcon icon={CloudUpload} title="Submit" />
        </button>
        <button type="submit" name="action" value="preview" class={buttonStyle}>
          <LucideIcon icon={ChevronRight} title="Preview" />
        </button>
      </div>
    </form>
  )
}
