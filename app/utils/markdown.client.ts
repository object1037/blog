import matter from 'gray-matter'
import MarkdownIt, { type Token } from 'markdown-it'
import container from 'markdown-it-container'
import Shikiji from 'markdown-it-shikiji'

import { matterSchema } from './parsePostData'

const convertMarkdown = async (markdown: string) => {
  const md = new MarkdownIt({
    linkify: true,
  })

  const detailsPattern = /^details\s+(.*)$/

  md.use(
    await Shikiji({
      theme: 'material-theme-palenight',
    }),
  )
    .use(container, 'info')
    .use(container, 'warn')
    .use(container, 'danger')
    .use(container, 'details', {
      validate: (params: string) => {
        return params.trim().match(detailsPattern)
      },
      render: (tokens: Token[], idx: number) => {
        const summary = tokens[idx]?.info.trim().match(detailsPattern)?.[1]

        if (tokens[idx]?.nesting === 1) {
          return `<details><summary>${md.utils.escapeHtml(
            summary ?? '',
          )}</summary>\n`
        } else {
          return '</details>\n'
        }
      },
    })

  md.renderer.rules.image = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (!token) return ''

    const src = token?.attrGet('src') || ''
    const title = token?.attrGet('title') || ''
    const altRaw = slf.renderInlineAsText(token.children ?? [], options, env)

    const delimiter = altRaw.lastIndexOf('|')
    const alt = delimiter === -1 ? altRaw : altRaw.slice(0, delimiter)
    const size = delimiter === -1 ? '' : altRaw.slice(delimiter + 1)
    const [width, height] = size.split(':').map((s) => parseInt(s, 10))
    
    let sizes = ''
    if (width && height && !(isNaN(width) || isNaN(height))) {
      sizes = `width="${width}" height="${height}"`
    }

    const name = src.split('.')[0]

    return `<picture>
  <source srcset="${name}.webp" type="image/webp" />
  <img src="${src}" alt="${alt}" title="${title}" ${sizes} loading="lazy" decoding="async" />
</picture>`
  }

  const { content, data } = matter(markdown)
  const html = md.render(content)
  if (data.public === undefined) {
    data.public = false
  }
  const parsedData = matterSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Response('Invalid data', { status: 400 })
  }

  return { frontmatter: parsedData.data, html }
}

export const convertFormData = async (formData: FormData) => {
  const markdown = formData.get('markdown')
  if (typeof markdown !== 'string') {
    throw new Response('Missing markdown', { status: 400 })
  }
  const { frontmatter, html } = await convertMarkdown(markdown)

  formData.set('html', html)
  formData.set('frontmatter', JSON.stringify(frontmatter))

  return formData
}
