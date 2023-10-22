import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { Form, Link, useLoaderData } from '@remix-run/react'

import { getAllPosts } from '~/db.server'
import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
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
    <div>
      <h1>Dashboard</h1>
      <Form action="../new">
        <button>New</button>
      </Form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`../posts/${post.id}`} prefetch="intent">
              <p>{post.title}</p>
            </Link>
            <Form action={`../posts/${post.id}/edit`}>
              <button>Edit</button>
            </Form>
            <Form action={`../posts/${post.id}/delete`} method="post">
              <button>Delete</button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  )
}
