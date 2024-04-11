import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'

import { type AsyncZippable, strToU8, zip } from 'fflate'
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

  const download = (file: BlobPart, name: string) => {
    const url = URL.createObjectURL(new Blob([file]))
    const dl = document.createElement('a')
    dl.download = name
    dl.href = url
    dl.click()
    URL.revokeObjectURL(url)
  }

  const downloadHandler = async () => {
    const fetches = posts.map((post) =>
      fetch(`/posts/${post.id}.md`)
        .then((res) => res.text())
        .then((markdown) => ({ id: post.id, markdown })),
    )
    const responses = await Promise.all(fetches)
    const zipObj: AsyncZippable = {}
    for (const { id, markdown } of responses) {
      zipObj[`${id}.md`] = strToU8(markdown)
    }
    zip(zipObj, (_err, data) => {
      download(data, 'blog_posts.zip')
    })
  }

  return (
    <ContainerWithHeading heading="Posts">
      <Form action="../new">
        <button type="submit">New</button>
      </Form>
      <button type="button" onClick={downloadHandler}>
        download
      </button>
      <ul>
        {posts.map((post) => (
          <DashPostCard key={post.id} post={post} />
        ))}
      </ul>
    </ContainerWithHeading>
  )
}
