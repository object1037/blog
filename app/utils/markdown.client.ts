import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import Shikiji from 'markdown-it-shikiji'

import { matterSchema } from './parsePostData'

const convertMarkdown = async (markdown: string) => {
  const md = new MarkdownIt({
    linkify: true,
  })

  md.use(
    await Shikiji({
      theme: 'material-theme-palenight',
    }),
  )

  md.renderer.rules.image = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (!token) return ''
    const src = token?.attrGet('src') || ''
    const alt = slf.renderInlineAsText(token.children ?? [], options, env)
    const name = src.split('.')[0]

    return `<picture>
  <source srcset="${name}.webp" type="image/webp" />
  <img src="${src}" alt="${alt}" loading="lazy" decoding="async" />
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
