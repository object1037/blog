import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'
import { container, divider } from 'styled-system/patterns'

import { PostList } from './postList'
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

  const headingStyle = css({
    fontSize: '5xl',
    fontWeight: 'bold',
    py: '6',
  })

  return (
    <div
      className={container({
        maxWidth: '3xl',
        px: {base: '6', md: '8', lg: '10'},
      })}
    >
      <div
        className={divider({
          w: '10',
          mt: '2',
        })}
      />
      <h1 className={headingStyle}>Posts</h1>
      <PostList posts={posts} />
    </div>
  )
}
