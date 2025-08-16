import { css } from 'hono/css'
import { useEffect, useRef, useState } from 'hono/jsx'
import { highlight, initHighlighter } from '../lib/highlight'

const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Tab') {
    document.execCommand('insertHTML', false, '  ')
    e.preventDefault()
  }
}

const containerStyle = css`
  position: relative;
  width: 100%;
  height: 50rem;
  max-height: 100vh;
  overflow: auto;
  border-radius: 0.5rem;
  transition: border 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e5e5e5;
  &:has(textarea:focus-visible) {
    border: 1px solid #a3a3a3;
  }
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`
const commonStyle = css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  border-radius: 0.5rem;
`
const preStyle = css`
  ${commonStyle}
  pointer-events: none;
`
const textareaStyle = css`
  ${commonStyle}
  background-color: transparent;
  color: transparent;
  caret-color: black;
  resize: none;
  font-family: inherit;
  overflow: hidden;
  &:focus-visible {
    outline: none;
  }
`

export const Editor = ({ initialValue = '' }: { initialValue?: string }) => {
  const codeBlockRef = useRef<HTMLElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [content, setContent] = useState(initialValue)

  useEffect(() => {
    initHighlighter()
    updateTextareaHeight()
  }, [])

  useEffect(() => {
    highlight(codeBlockRef.current, content)
  }, [content])

  const updateTextareaHeight = () => {
    const target = textareaRef.current
    if (!target) return
    target.style.height = 'auto'
    target.style.height = `${target.scrollHeight}px`
  }

  return (
    <form method="post" action="/new">
      <div class={containerStyle}>
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
          class={textareaStyle}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
