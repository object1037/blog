import matter from 'gray-matter';
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