import { type Token } from 'markdown-it/index.js'
import { escapeHtml } from 'markdown-it/lib/common/utils.mjs'

const detailsPattern = /^details\s+(.*)$/
export const detailsOption = {
  validate: (params: string) => {
    return detailsPattern.test(params.trim())
  },
  render: (tokens: Token[], idx: number) => {
    const summary = tokens[idx]?.info.trim().match(detailsPattern)?.[1]

    if (tokens[idx]?.nesting === 1) {
      return `<details><summary>${escapeHtml(summary ?? '')}</summary>\n`
    } else {
      return '</details>\n'
    }
  },
}

const notePattern = /^note\s*(info|warn|danger)?$/
export const noteOption = {
  validate: (params: string) => {
    return notePattern.test(params.trim())
  },
  render: (tokens: Token[], idx: number) => {
    const type = tokens[idx]?.info.trim().match(notePattern)?.[1] ?? 'info'
    if (tokens[idx]?.nesting === 1) {
      return `<aside class='note ${type}'><div>\n`
    } else {
      return '</div></aside>\n'
    }
  },
}
