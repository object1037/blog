import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'

import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(
    envSchema.parse(context.cloudflare.env),
  )
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/dashboard',
  })
}

export default function Login() {
  return (
    <Form method="post" action="/auth/github">
      <button>Login with GitHub</button>
    </Form>
  )
}
