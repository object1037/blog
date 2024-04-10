import {
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { z } from 'zod'

import { getPostData } from '~/.server/db'
import { Article } from '~/components/article'
import { envSchema } from '~/env'
import styles from '~/styles/markdown.css?url'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.post.title} | ゆるふわインターネット` },
    { name: 'description', content: data?.post.description },
  ]
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)

  const postId = params.postId
  const parsedId = z.coerce.number().safeParse(postId)
  if (!parsedId.success) {
    throw new Response('Invalid postId', { status: 400 })
  }

  const post = await getPostData(env.DB, Number(postId))
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  const cacheControl =
    'public, max-age=30, stale-while-revalidate=600, stale-if-error=864000'

  return json({ post }, { headers: { 'Cache-Control': cacheControl } })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  return <Article post={post} />
}
