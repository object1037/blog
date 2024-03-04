import { useEffect } from 'react'

import {
  type LinksFunction,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { z } from 'zod'

import { getPostData } from '~/.server/db'
import { ContainerWithHeading } from '~/components/containerWithHeading'
import { TagList } from '~/components/tagList'
import { envSchema } from '~/env'
import styles from '~/styles/markdown.css?url'

interface ToC {
  level: number
  text: string
  id: string
  children: ToC[]
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)

  const postId = params.postId
  const parsedId = z.coerce.number().safeParse(postId)
  if (!parsedId.success) {
    throw new Response('Invalid postId', { status: 400 })
  }

  const post = await getPostData(env.DB, Number(postId))
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  const cacheControl =
    'public, max-age=30, stale-while-revalidate=600, stale-if-error=864000'

  return json({ post }, { headers: { 'Cache-Control': cacheControl } })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2,h3'))
    const headingsToC: ToC[] = headings.map((heading) => ({
      level: parseInt(heading.tagName.slice(1), 10),
      text:
        (heading instanceof HTMLElement
          ? heading.innerText
          : heading.textContent) ?? '',
      id: heading.id,
      children: [],
    }))

    const toc: ToC[] = headingsToC.reduce((acc: ToC[], heading: ToC) => {
      let parent = acc

      while (parent.length > 0) {
        const last = parent.slice(-1)[0]
        if (!last || last.level >= heading.level) {
          break
        }
        parent = last.children
      }

      parent.push(heading)
      return acc
    }, [])
    console.log(toc)
  }, [])

  return (
    <ContainerWithHeading heading={post.title}>
      <TagList tags={post.tags} />
      <div
        className="markdown_wrapper"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </ContainerWithHeading>
  )
}
