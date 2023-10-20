import { type ActionFunctionArgs, redirect } from '@remix-run/cloudflare'

import { getAuthenticator } from '~/services/auth.server'

export const loader = async () => {
  return redirect('/login')
}

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(context.env as Env)
  return authenticator.authenticate('github', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
