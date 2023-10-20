import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'

import { getPostData, getPosts } from '~/db.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = context.env as Env
  const posts = await getPosts(env.DB)

  const datas = []

  for (const post of posts) {
    const postData = await getPostData(env.DB, post.id)
    datas.push(postData)
  }

  return json({ posts, datas })
}

export default function Index() {
  const { posts, datas } = useLoaderData<typeof loader>()
  console.log(posts)
  console.log(datas)

  return (
    <section>
      <h1 className={css({ fontWeight: 'bold' })}>Blog</h1>
      <p>hello</p>
    </section>
  )
}
