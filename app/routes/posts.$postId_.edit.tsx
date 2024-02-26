import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/cloudflare'
import { Form, useLoaderData, useSubmit } from '@remix-run/react'

import { z } from 'zod'

import { addPost, getAllPostData } from '~/.server/db'
import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'
import { convertFormData } from '~/utils/markdown.client'
import { parsePostData } from '~/utils/parsePostData'

export const loader = async ({
  params,
  context,
  request,
}: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)
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
  const submit = useSubmit()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = await convertFormData(new FormData(e.currentTarget))
    submit(formData, { method: 'post' })
  }

  return (
    <div>
      <Form method="post" onSubmit={submitHandler}>
        <textarea name="markdown" defaultValue={post.markdown} />
        <button>Save</button>
      </Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)
  const formData = await request.formData()

  const { newPost, tags } = await parsePostData(formData)

  await addPost(
    env.DB,
    newPost,
    tags.map((tag) => ({ name: tag })),
  )

  return redirect('/dashboard')
}
