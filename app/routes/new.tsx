import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { EditPage, head } from '../components/editPage'
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

export default createRoute(requireAuth, async (c) => {
  const { objects } = await c.env.BUCKET.list()
  return c.render(
    <EditPage
      id={undefined}
      content={template}
      errors={[]}
      images={objects.map((obj) => obj.key)}
    />,
    head,
  )
})

export const POST = createRoute(
  requireAuth,
  vValidator(
    'form',
    v.object({
      content: v.string(),
      action: v.string(),
      id: v.union([
        v.literal(''),
        v.pipe(v.string(), v.transform(Number), v.number()),
      ]),
    }),
  ),
  async (c) => {
    const { content, action, id: idUnion } = c.req.valid('form')
    const result = parseMarkdown(typeof content === 'string' ? content : '')

    const id = idUnion === '' ? undefined : idUnion

    if (!result.success) {
      console.log(result.errors)
      const { objects } = await c.env.BUCKET.list()

      return c.render(
        <EditPage
          id={id}
          content={content}
          errors={result.errors}
          images={objects.map((obj) => obj.key)}
        />,
        head,
      )
    }

    if (action === 'preview') {
      const { objects } = await c.env.BUCKET.list()

      return c.render(
        <EditPage
          id={id}
          content={content}
          errors={[]}
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
