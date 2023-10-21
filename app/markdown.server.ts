import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { z } from 'zod'

export const convertMarkdown = (markdown: string) => {
  const md = new MarkdownIt({
    linkify: true,
  })

  const matterSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    public: z.boolean().nullable(),
  })

  const { content, data } = matter(markdown)
  const html = md.render(content)
  const parsedData = matterSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Response('Invalid data', { status: 400 })
  }

  return { frontmatter: parsedData.data, html }
}