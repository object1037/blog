import { useEffect } from 'hono/jsx'
import { highlight, initHighlighter } from '../lib/highlight.client'

export const Highlight = () => {
  useEffect(() => {
    initHighlighter()
    const codeBlocks = document.querySelectorAll('pre code')
    codeBlocks.forEach((codeBlock) => {
      if (!(codeBlock instanceof HTMLElement)) {
        return
      }
      const language = codeBlock.className.replace('language-', '')
      highlight(codeBlock, codeBlock.textContent, language, false)
    })
  }, [])

  // biome-ignore lint/complexity/noUselessFragments: this component is for effect only
  return <></>
}
