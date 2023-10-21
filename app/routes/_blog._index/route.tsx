import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'

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
    <section>
      <h2 className={css({ fontWeight: 'bold' })}>Blog</h2>
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
