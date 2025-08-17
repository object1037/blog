import { useEffect, useRef, useState } from 'hono/jsx'
import { highlight, initHighlighter } from '../lib/highlight'

const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Tab') {
    document.execCommand('insertHTML', false, '  ')
    e.preventDefault()
  }
}

export const Editor = ({
  initialValue = '',
  style,
}: {
  initialValue?: string
  style: {
    container: string
    pre: string
    textarea: string
  }
}) => {
  const { container, pre, textarea } = style
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
      <div class={container}>
        <pre ref={codeBlockRef} class={pre}>
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
          class={textarea}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
