import { createClient } from 'honox/client'
import { highlight, initHighlighter } from './lib/highlight.client'

createClient()
initHighlighter()
const codeBlocks = document.querySelectorAll('pre code')
codeBlocks.forEach((codeBlock) => {
  if (!(codeBlock instanceof HTMLElement)) {
    return
  }
  const language = codeBlock.className.replace('language-', '')
  highlight(codeBlock, codeBlock.textContent, language, false)
})
