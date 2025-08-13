import { useEffect, useRef } from 'hono/jsx'
import Prism from 'prismjs'

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
    document.execCommand('insertHTML', false, '	')
    e.preventDefault()
  }
}

const flattenTextNodes = (codeBlock: Node) => codeBlock.normalize()

const paintTokenHighlights = (
  codeBlock: HTMLPreElement,
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

const highlight = (codeBlock: HTMLPreElement | null) => {
  if (!codeBlock) return

  flattenTextNodes(codeBlock)

  const mdGrammer = Prism.languages.js
  if (!mdGrammer) {
    console.error('Markdown grammar not found')
    console.log(Prism.languages)
    return
  }
  const tokens = Prism.tokenize(codeBlock.innerText, mdGrammer)

  tokenTypes.forEach((tokenType) => {
    CSS.highlights.get(tokenType)?.clear()
  })

  paintTokenHighlights(codeBlock, tokens)
}

export const Editor = () => {
  const codeBlockRef = useRef<HTMLPreElement>(null)
  useEffect(() => {
    Prism.manual = true
    tokenTypes.forEach((tokenType) => {
      CSS.highlights.set(tokenType, new Highlight())
    })
  }, [])

  return (
    <pre
      contenteditable
      ref={codeBlockRef}
      onKeyUp={() => highlight(codeBlockRef.current)}
      onKeyDown={handleKeydown}
    ></pre>
  )
}
