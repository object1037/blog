import { type ActionFunctionArgs, redirect } from '@remix-run/cloudflare'

import { z } from 'zod'

import { deletePost } from '~/db.server'
import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const authenticator = getAuthenticator(env)
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw new Response('Unauthorized', { status: 401 })
  }

  const postId = params.postId
  const parsedId = z.coerce.number().safeParse(postId)
  if (!parsedId.success) {
    throw new Response('Invalid postId', { status: 400 })
  }

  await deletePost(env.DB, parsedId.data)

  return redirect('/dashboard')
}
