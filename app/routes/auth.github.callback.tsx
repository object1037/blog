import { type LoaderFunctionArgs } from '@remix-run/cloudflare'

import { getAuthenticator } from '~/services/auth.server'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context.env as Env)
  return authenticator.authenticate('github', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
