import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-c'

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

export const initHighlighter = () => {
  tokenTypes.forEach((tokenType) => {
    if (!CSS.highlights.has(tokenType)) {
      CSS.highlights.set(tokenType, new Highlight())
    }
  })
}

export const highlight = (
  codeBlock: HTMLElement | null,
  content: string,
  language: string,
  reset: boolean = true,
) => {
  if (!codeBlock) return

  const grammar = Prism.languages[language]
  if (!grammar) {
    console.error(`${language} grammar not found`)
    console.log(Prism.languages)
    return
  }
  const tokens = Prism.tokenize(content, grammar)

  if (reset) {
    tokenTypes.forEach((tokenType) => {
      CSS.highlights.get(tokenType)?.forEach((range, key, parent) => {
        if (
          range.startContainer.parentElement?.nextElementSibling?.tagName ===
          'TEXTAREA'
        ) {
          parent.delete(key)
        }
      })
    })
  }

  paintTokenHighlights(codeBlock, tokens)
}

const tokenTypes = [
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
  'prediction',
]
