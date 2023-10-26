import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { PostList } from '../../components/postList'
import { ContainerWithHeading } from '~/components/containerWithHeading'
import { getPosts } from '~/db.server'
import { envSchema } from '~/env'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const posts = await getPosts(env.DB)

  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <ContainerWithHeading heading="Posts">
      <PostList posts={posts} />
    </ContainerWithHeading>
  )
}
