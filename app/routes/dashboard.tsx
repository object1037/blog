import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'

import { getAuthenticator } from '~/services/auth.server'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context.env as Env)
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json({ user })
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Hi, {user.id} {user.name}
      </p>
      <Form method="post">
        <button>Logout</button>
      </Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(context.env as Env)
  await authenticator.logout(request, { redirectTo: '/login' })
}
