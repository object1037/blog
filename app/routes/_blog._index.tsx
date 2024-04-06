import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getPosts } from '~/.server/db'
import { ContainerWithHeading } from '~/components/containerWithHeading'
import { PostCard } from '~/components/postCard'
import { envSchema } from '~/env'

export const meta: MetaFunction = () => {
  return [
    { title: 'ゆるふわインターネット' },
    { name: 'description', content: 'object1037のブログ' },
    {
      tagName: 'link',
      rel: 'canonical',
      href: 'https://blog.object1037.dev',
    },
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
      <ul>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </ContainerWithHeading>
  )
}
