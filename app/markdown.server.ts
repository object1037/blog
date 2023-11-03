import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import Shikiji from 'markdown-it-shikiji'
import { z } from 'zod'

export const convertMarkdown = async (markdown: string) => {
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

  const matterSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    public: z.boolean().nullable(),
    tags: z.array(z.string()),
  })

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
