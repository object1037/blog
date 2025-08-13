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

const highlight = (
  codeBlock: HTMLPreElement | null,
  setCode: ReturnType<typeof useState<string>>[1],
) => {
  if (!codeBlock) return

  flattenTextNodes(codeBlock)

  const mdGrammer = Prism.languages.markdown
  if (!mdGrammer) {
    console.error('Markdown grammar not found')
    console.log(Prism.languages)
    return
  }
  const innerText = codeBlock.innerText
  setCode(innerText)
  const tokens = Prism.tokenize(innerText, mdGrammer)

  tokenTypes.forEach((tokenType) => {
    CSS.highlights.get(tokenType)?.clear()
  })

  paintTokenHighlights(codeBlock, tokens)
}

const submitHandler = async (e: Event) => {
  e.preventDefault()
  const result = await fetch('/new', {
    method: 'POST',
    body: new FormData(e.target as HTMLFormElement),
  })

  if (result.status >= 400) {
    console.error('Failed to create post')
    return
  }

  window.location.replace('/dashboard')
}

export const Editor = () => {
  const codeBlockRef = useRef<HTMLPreElement>(null)
  const [code, setCode] = useState<string>()
  useEffect(() => {
    Prism.manual = true
    tokenTypes.forEach((tokenType) => {
      CSS.highlights.set(tokenType, new Highlight())
    })
  }, [])

  return (
    <form method="post" onSubmit={submitHandler}>
      <pre
        contenteditable="plaintext-only"
        ref={codeBlockRef}
        onKeyUp={() => highlight(codeBlockRef.current, setCode)}
        onKeyDown={handleKeydown}
      ></pre>
      <input type="hidden" name="code" value={code} />
      <button type="submit">Submit</button>
    </form>
  )
}
