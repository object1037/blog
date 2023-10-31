import { type ActionFunctionArgs, type LoaderFunctionArgs, json, redirect } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'

import { addPost } from '~/db.server'
import { envSchema } from '~/env'
import { convertMarkdown } from '~/markdown.server'
import { type InsertPost } from '~/schema'
import { getAuthenticator } from '~/services/auth.server'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(envSchema.parse(context.env))
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json({ user })
}

export default function New() {
  const defaultMarkdown = `---
id:
title:
description:
tags: []
public: false
---
`

  return (
    <div>
      <h2>new</h2>
      <Form method="post">
        <textarea name="markdown" defaultValue={defaultMarkdown} />
        <button>Save</button>
      </Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const body = await request.formData()
  const markdown = body.get('markdown')
  if (typeof markdown !== 'string') {
    throw new Response('Missing markdown', { status: 400 })
  }
  const { frontmatter, html } = await convertMarkdown(markdown)

  const { tags, ...restMatter } = frontmatter

  const newPost: Required<InsertPost> = {
    ...restMatter,
    markdown,
    html,
  }

  await addPost(
    envSchema.parse(context.env).DB,
    newPost,
    tags.map((tag) => ({ name: tag })),
  )

  return redirect('/dashboard')
}