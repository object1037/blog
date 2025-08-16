import { useEffect, useRef, useState } from 'hono/jsx'
import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'
import { css } from 'hono/css'

export const tokenTypes = [
  'atrule',
  'attr-name',
  'attr-value',
  'bold',
  'boolean',
  'builtin',
  'cdata',
  'char',
  'class-name',
  'comment',
  'constant',
  'deleted',
  'doctype',
  'entity',
  'function',
  'important',
  'inserted',
  'italic',
  'keyword',
  'namespace',
  'number',
  'operator',
  'prolog',
  'property',
  'punctuation',
  'regex',
  'rule',
  'selector',
  'string',
  'symbol',
  'tag',
  'url',
]

const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Tab') {
    document.execCommand('insertHTML', false, '  ')
    e.preventDefault()
  }
}

const paintTokenHighlights = (
  codeBlock: HTMLElement,
  tokens: (string | Prism.Token)[],
) => {
  let pos = 0
  for (const token of tokens) {
    if (typeof token !== 'string') {
      const range = new Range()
      if (!codeBlock.firstChild) {
        return
      }
      range.setStart(codeBlock.firstChild, pos)
      range.setEnd(codeBlock.firstChild, pos + token.length)

      const alias = token.alias
      const alias_str = Array.isArray(alias) ? alias[0] : alias
      CSS.highlights.get(alias_str ?? token.type)?.add(range)
    }
    pos += token.length
  }
}

const highlight = (codeBlock: HTMLElement | null, content: string) => {
  if (!codeBlock) return

  const mdGrammer = Prism.languages.markdown
  if (!mdGrammer) {
    console.error('Markdown grammar not found')
    console.log(Prism.languages)
    return
  }
  const tokens = Prism.tokenize(content, mdGrammer)

  tokenTypes.forEach((tokenType) => {
    CSS.highlights.get(tokenType)?.clear()
  })

  paintTokenHighlights(codeBlock, tokens)
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
    Prism.manual = true
    tokenTypes.forEach((tokenType) => {
      CSS.highlights.set(tokenType, new Highlight())
    })
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
