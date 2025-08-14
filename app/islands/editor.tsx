import { useEffect, useRef, useState } from 'hono/jsx'
import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'

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

export const Editor = ({ initialValue = '' }: { initialValue?: string }) => {
  const codeBlockRef = useRef<HTMLElement>(null)
  const [content, setContent] = useState(initialValue)

  useEffect(() => {
    Prism.manual = true
    tokenTypes.forEach((tokenType) => {
      CSS.highlights.set(tokenType, new Highlight())
    })
  }, [])

  useEffect(() => {
    highlight(codeBlockRef.current, content)
  }, [content])

  return (
    <form method="post">
      <pre ref={codeBlockRef}>{content}</pre>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent((e.target as HTMLTextAreaElement).value)}
        rows={4}
        cols={40}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
