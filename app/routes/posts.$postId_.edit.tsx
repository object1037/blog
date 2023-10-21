import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'

import { addPost, getAllPostData } from '~/db.server'
import { envSchema } from '~/env'
import { convertMarkdown } from '~/markdown.server'
import { type InsertPost } from '~/schema'

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const postId = params.postId
  if (typeof postId !== 'string' || isNaN(Number(postId))) {
    throw new Response('Not Found', { status: 404 })
  }
  const post = await getAllPostData(env.DB, Number(postId))
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ post })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <div>
      <Form method="post">
        <textarea name="markdown">{post.markdown}</textarea>
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

  await addPost(envSchema.parse(context.env).DB, newPost)

  return redirect('/dashboard')
}
