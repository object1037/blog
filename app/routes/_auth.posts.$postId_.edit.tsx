import { useCallback, useState } from 'react'

import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/cloudflare'
import { useFetcher, useLoaderData } from '@remix-run/react'

import { z } from 'zod'

import { addPost, getAllPostData } from '~/.server/db'
import { Editor } from '~/components/editor'
import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'
import { convertMarkdown } from '~/utils/markdown.client'
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
  const fetcher = useFetcher()
  const [value, setValue] = useState(post.markdown)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { frontmatter, html } = await convertMarkdown(value)
    fetcher.submit(
      {
        markdown: value,
        frontmatter: JSON.stringify(frontmatter),
        html,
      },
      { method: 'post' },
    )
  }
  const onChange = useCallback((val: string) => {
    setValue(val)
  }, [])

  return (
    <div>
      <Editor value={value} onChange={onChange} />
      <fetcher.Form onSubmit={submitHandler}>
        <button>Save</button>
      </fetcher.Form>
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
