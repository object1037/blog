import { type LoaderFunctionArgs } from '@remix-run/cloudflare'

import { envSchema } from '~/env'

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const key = params.key
  if (key == null) {
    throw new Response('Invalid key', { status: 400 })
  }
  const env = envSchema.parse(context.env)
  const object = await env.BUCKET.get(key)
  if (!object) {
    throw new Response('Not Found', { status: 404 })
  }
  const headers: HeadersInit = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.etag)

  return new Response(object.body, { headers })
}
