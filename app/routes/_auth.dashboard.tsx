import {
  type LoaderFunctionArgs,
  MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'

import { getAllPosts } from '~/.server/db'
import { ContainerWithHeading } from '~/components/containerWithHeading'
import { DashPostCard } from '~/components/dashPostCard'
import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'

export const meta: MetaFunction = () => [{ title: 'Blog Dashboard' }]

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)
  const authenticator = getAuthenticator(env)
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const posts = await getAllPosts(env.DB)

  return json({ posts })
}

export default function Dashboard() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <ContainerWithHeading heading="Posts">
      <Form action="../new">
        <button>New</button>
      </Form>
      <ul>
        {posts.map((post) => (
          <DashPostCard key={post.id} post={post} />
        ))}
      </ul>
    </ContainerWithHeading>
  )
}
