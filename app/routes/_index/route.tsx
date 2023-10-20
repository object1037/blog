import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'

import { getPosts } from '~/db.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = context.env as Env
  const posts = await getPosts(env.DB)

  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <section>
      <h1 className={css({ fontWeight: 'bold' })}>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} prefetch="intent">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
