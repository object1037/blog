import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { EditPage } from '../components/editPage'
import { requireAuth } from '../middlewares/requireAuth'
import { addPost } from '../services/db'
import { parseMarkdown } from '../services/markdown'

const template = `---
id: 
title: 
description: 
tags: []
public: false
---

`
const head = {
  heading: 'New Post',
  isDashboard: true,
}

export default createRoute(requireAuth, async (c) => {
  const { objects } = await c.env.BUCKET.list()
  return c.render(
    <EditPage
      content={template}
      errors={[]}
      images={objects.map((obj) => obj.key)}
    />,
    head,
  )
})

export const POST = createRoute(
  requireAuth,
  vValidator('form', v.object({ content: v.string() })),
  async (c) => {
    const { content } = c.req.valid('form')
    const result = parseMarkdown(typeof content === 'string' ? content : '')
    if (!result.success) {
      console.log(result.errors)
      const { objects } = await c.env.BUCKET.list()

      return c.render(
        <EditPage
          content={content}
          errors={result.errors}
          images={objects.map((obj) => obj.key)}
        />,
        head,
      )
    }

    const { tags, ...rest } = result.frontmatter

    const post = {
      ...rest,
      content,
    }

    await addPost(c.env.DB, post, tags)

    return c.redirect('/dashboard', 303)
  },
)
