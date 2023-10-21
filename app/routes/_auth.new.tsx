import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'

import { envSchema } from 'env'

import { addPost } from '~/db.server'
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
  return (
    <div>
      <h2>new</h2>
      <Form method="post">
        <textarea name="markdown" />
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
  const { frontmatter, html } = convertMarkdown(markdown)

  const newPost: InsertPost = {
    ...frontmatter,
    markdown,
    html,
  }

  const { success } = await addPost(envSchema.parse(context.env).DB, newPost)

  return json({ success })
}
