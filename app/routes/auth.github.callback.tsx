import { type LoaderFunctionArgs } from '@remix-run/cloudflare'

import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(
    envSchema.parse(context.cloudflare.env),
  )
  return authenticator.authenticate('github', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
