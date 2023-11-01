import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'

import { z } from 'zod'

import { addPost, getAllPostData, pruneTags } from '~/db.server'
import { envSchema } from '~/env'
import { convertMarkdown } from '~/markdown.server'
import { type InsertPost } from '~/schema'
import { getAuthenticator } from '~/services/auth.server'

export const loader = async ({
  params,
  context,
  request,
}: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const authenticator = getAuthenticator(env)
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const postId = params.postId
  const parsedId = z.coerce.number().safeParse(postId)
  if (!parsedId.success) {
    throw new Response('Invalid postId', { status: 400 })
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
        <textarea name="markdown" defaultValue={post.markdown} />
        <button>Save</button>
      </Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const env = envSchema.parse(context.env)
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
    env.DB,
    newPost,
    tags.map((tag) => ({ name: tag })),
  )

  await pruneTags(env.DB)

  return redirect('/dashboard')
}
