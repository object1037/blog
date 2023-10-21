import { type ActionFunctionArgs } from '@remix-run/cloudflare'
import { Form, Outlet } from '@remix-run/react'

import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'

export default function AuthLayout() {
  return (
    <div>
      <h1>Auth Layout</h1>
      <Form method="post">
        <button>Logout</button>
      </Form>
      <Outlet />
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(envSchema.parse(context.env))
  await authenticator.logout(request, { redirectTo: '/login' })
}
