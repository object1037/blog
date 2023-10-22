import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getPostData } from '~/db.server'
import { envSchema } from '~/env'

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const postId = params.postId
  if (typeof postId !== 'string' || isNaN(Number(postId))) {
    throw new Response('Not Found', { status: 404 })
  }
  const post = await getPostData(env.DB, Number(postId))
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ post })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>{post.title}</h1>
      <ul>
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}
