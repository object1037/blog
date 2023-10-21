import { type ActionFunctionArgs, redirect } from '@remix-run/cloudflare'

import { envSchema } from 'env'

import { getAuthenticator } from '~/services/auth.server'

export const loader = async () => {
  return redirect('/login')
}

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(envSchema.parse(context.env))
  return authenticator.authenticate('github', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
