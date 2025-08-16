import MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it/index.js'
import anchor from 'markdown-it-anchor'
import container from 'markdown-it-container'
import * as v from 'valibot'
import { extractFrontmatter } from '../lib/frontmatter'
import { type FrontMatter, parseFrontmatter } from './db'

const { escapeHtml } = MarkdownIt().utils

type ParsedResult =
  | { success: false; errors: string[] }
  | { success: true; frontmatter: FrontMatter }

export const markdownToHtml = (markdown: string) => {
  const md = MarkdownIt({
    linkify: true,
  })
  md.use(container, 'note', noteOption)
    .use(container, 'details', detailsOption)
    .use(anchor, {
      level: [1, 2, 3, 4],
      permalink: anchor.permalink.ariaHidden({
        symbol: '',
      }),
      tabIndex: false,
    })

  const { content } = extractFrontmatter(markdown)

  const html = md.render(content)

  return html
}

export const parseMarkdown = (markdown: string): ParsedResult => {
  const { frontmatter } = extractFrontmatter(markdown)
  const result = v.safeParse(parseFrontmatter, frontmatter)
  if (!result.success) {
    return {
      success: false,
      errors: result.issues.map((issue) => issue.message),
    }
  }

  return {
    success: true,
    frontmatter: result.output,
  }
}

const detailsPattern = /^details\s+(.*)$/
const detailsOption = {
  validate: (params: string) => {
    return detailsPattern.test(params.trim())
  },
  render: (tokens: Token[], idx: number) => {
    const summary = tokens[idx]?.info.trim().match(detailsPattern)?.[1]

    if (tokens[idx]?.nesting === 1) {
      return `<details><summary>${escapeHtml(summary ?? '')}</summary>\n`
    }
    return '</details>\n'
  },
}

const notePattern = /^note\s*(info|warn|danger)?$/
const noteOption = {
  validate: (params: string) => {
    return notePattern.test(params.trim())
  },
  render: (tokens: Token[], idx: number) => {
    const type = tokens[idx]?.info.trim().match(notePattern)?.[1] ?? 'info'
    if (tokens[idx]?.nesting === 1) {
      return `<aside class='note ${type}'><div>\n`
    }
    return '</div></aside>\n'
  },
}
