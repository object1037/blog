import { z } from 'zod'

import type { InsertPost } from '~/.server/schema'

export const matterSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  public: z.boolean(),
  tags: z.array(z.string()),
})

export const parsePostData = async (formData: FormData) => {
  const markdown = z.string().safeParse(formData.get('markdown'))
  const html = z.string().safeParse(formData.get('html'))
  const rawFrontmatter = z.string().safeParse(formData.get('frontmatter'))

  if (!(markdown.success && html.success && rawFrontmatter.success)) {
    throw new Response('Invalid data', { status: 400 })
  }

  const frontmatter = matterSchema.safeParse(JSON.parse(rawFrontmatter.data))
  if (!frontmatter.success) {
    throw new Response('Invalid frontmatter', { status: 400 })
  }

  const { tags, ...restMatter } = frontmatter.data

  const newPost: Required<InsertPost> = {
    ...restMatter,
    markdown: markdown.data,
    html: html.data,
  }

  return { newPost, tags }
}
