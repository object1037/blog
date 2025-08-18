import MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it/index.js'
import anchor from 'markdown-it-anchor'
import container from 'markdown-it-container'
import { thumbHashToDataURL } from 'thumbhash'
import * as v from 'valibot'
import { css } from '../../styled-system/css'
import { extractFrontmatter } from '../lib/frontmatter'
import {
  imageFileNameRegex,
  imageFileNameSchema,
} from '../routes/images/[file]'
import { type FrontMatter, parseFrontmatter } from './db'

const { escapeHtml } = MarkdownIt().utils

type ParsedResult =
  | { success: false; errors: string[] }
  | { success: true; frontmatter: FrontMatter }

export const markdownToHtml = (markdown: string) => {
  let hasCodeBlock = false
  const md = MarkdownIt({
    highlight() {
      hasCodeBlock = true
      return ''
    },
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

  md.renderer.rules.image = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (!token) return ''

    const src = token?.attrGet('src') || ''
    const title = token?.attrGet('title') || ''
    const alt = slf.renderInlineAsText(token.children ?? [], options, env)

    const result = v.safeParse(imageFileNameSchema, src)
    if (!result.success) {
      return `<img src="${src}" alt="${alt}" title="${title}" loading="lazy" decoding="async" />`
    }
    const [_fileName, _imageName, hash, width, height] =
      imageFileNameRegex.exec(result.output) ?? []
    let placeholderUrl = ''

    try {
      const hashBuffer = base64URLStringToBuffer(hash ?? '')
      placeholderUrl = thumbHashToDataURL(new Uint8Array(hashBuffer))
    } catch (error) {
      console.error('Error generating placeholder image:', error)
    }

    const wrapperStyle = css({
      bgSize: 'cover',
      bgPosition: 'center',
    })
    const imageStyle = css({
      opacity: 0,
      transition: 'opacity',
    })

    return `<div class="picture ${wrapperStyle}" style="background-image: url(${placeholderUrl})">
  <img onload="this.classList.remove('${css({ opacity: 0 })}')" class="${imageStyle}" src="${src}" alt="${alt}" title="${title}" width="${width}" height="${height}" loading="lazy" decoding="async" />
</div>`
  }

  const { content } = extractFrontmatter(markdown)

  const html = md.render(content)

  return { html, hasCodeBlock }
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

const base64URLStringToBuffer = (base64URLString: string): ArrayBuffer => {
  const base64 = base64URLString.replace(/\./g, '+').replace(/_/g, '/')
  const padLength = (4 - (base64.length % 4)) % 4
  const padded = base64.padEnd(base64.length + padLength, '=')

  const binary = atob(padded)

  const buffer = new ArrayBuffer(binary.length)
  const bytes = new Uint8Array(buffer)

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return buffer
}
