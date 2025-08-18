import { css } from 'hono/css'
import { useEffect, useRef, useState } from 'hono/jsx'
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

  return (
    <form method="post" action="/new">
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
      <button type="submit">Submit</button>
    </form>
  )
}
