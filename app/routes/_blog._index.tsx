import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { ContainerWithHeading } from '~/components/containerWithHeading'
import { PostList } from '~/components/postList'
import { getPosts } from '~/db.server'
import { envSchema } from '~/env'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)
  const posts = await getPosts(env.DB)

  const cacheControl =
    'public, max-age=30, stale-while-revalidate=600, stale-if-error=864000'

  return json({ posts }, { headers: { 'Cache-Control': cacheControl } })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <ContainerWithHeading heading="Posts">
      <PostList posts={posts} />
    </ContainerWithHeading>
  )
}
