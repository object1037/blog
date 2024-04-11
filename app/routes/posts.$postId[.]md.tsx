import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { z } from 'zod'
import { getMarkdown } from '~/.server/db'
import { envSchema } from '~/env'

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)

  const postId = params.postId
  const parsedId = z.coerce.number().safeParse(postId)
  if (!parsedId.success) {
    throw new Response('Invalid postId', { status: 400 })
  }

  const markdown = await getMarkdown(env.DB, Number(postId))
  if (!markdown) {
    throw new Response('Not Found', { status: 404 })
  }

  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown' },
  })
}
