import {
  type LoaderFunctionArgs,
  MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getPostsWithTag } from '~/.server/db'
import { ContainerWithHeading } from '~/components/containerWithHeading'
import { PostCard } from '~/components/postCard'
import { envSchema } from '~/env'

export const meta: MetaFunction = ({ params }) => {
  return [{ title: `Tag: ${params.tagName} | ゆるふわインターネット` }]
}

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)
  const tagName = params.tagName

  if (!tagName) {
    throw new Response('Invalid tagName', { status: 400 })
  }

  const posts = await getPostsWithTag(env.DB, tagName)

  const cacheControl =
    'public, max-age=30, stale-while-revalidate=600, stale-if-error=864000'

  return json(
    { tagName, posts },
    { headers: { 'Cache-Control': cacheControl } },
  )
}

export default function Tag() {
  const { tagName, posts } = useLoaderData<typeof loader>()

  return (
    <ContainerWithHeading heading={tagName}>
      <ul>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </ContainerWithHeading>
  )
}
