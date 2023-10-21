import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { envSchema } from 'env'

import { getPostData } from '~/db.server'

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const postId = params.postId
  if (typeof postId !== 'string' || isNaN(Number(postId))) {
    throw new Response('Not Found', { status: 404 })
  }
  const post = await getPostData(env.DB, Number(postId))

  return json({ post })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  return <div dangerouslySetInnerHTML={{ __html: post.html }} />
}
