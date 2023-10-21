import {
  createCookie,
  createWorkersKVSessionStorage,
} from '@remix-run/cloudflare'

import { type Env } from '~/env'

export const getSessionStrage = (env: Env) => {
  const sessionCookie = createCookie('__session', {
    secrets: [env.SESSION_SECRET],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })

  return createWorkersKVSessionStorage({
    kv: env.SESSION_KV,
    cookie: sessionCookie,
  })
}
