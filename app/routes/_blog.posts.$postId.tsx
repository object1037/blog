import {
  type LinksFunction,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { z } from 'zod'

import { ContainerWithHeading } from '~/components/containerWithHeading'
import { TagList } from '~/components/tagList'
import { getPostData } from '~/db.server'
import { envSchema } from '~/env'
import styles from '~/styles/markdown.css?url'

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

  return (
    <ContainerWithHeading heading={post.title}>
      <TagList tags={post.tags} />
      <div
        className="markdown_wrapper"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </ContainerWithHeading>
  )
}
