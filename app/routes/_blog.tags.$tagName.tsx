import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { getPostsWithTag } from '~/db.server'
import { envSchema } from '~/env'

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const tagName = params.tagName

  if (!tagName) {
    throw new Response('Invalid tagName', { status: 400 })
  }

  const posts = await getPostsWithTag(env.DB, tagName)

  return json({ posts })
}

export default function Tag() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div>
      <h2>Posts with tag</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`../posts/${post.id}`} prefetch="intent">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
