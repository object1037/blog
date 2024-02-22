import { type ActionFunctionArgs } from '@remix-run/cloudflare'

import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(
    envSchema.parse(context.cloudflare.env),
  )
  await authenticator.logout(request, { redirectTo: '/login' })
}
