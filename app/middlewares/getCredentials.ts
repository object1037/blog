import type { Env } from 'hono'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import * as v from 'valibot'
import { parseCredentialSchema } from '../lib/webauthn'

export const getCredentials = createMiddleware<Env>(async (c, next) => {
  try {
    const credentialStr = await c.env.KV.get('credential')
    if (!credentialStr) {
      c.set('credential', undefined)
    } else {
      c.set('credential', v.parse(parseCredentialSchema, credentialStr))
    }
    await next()
  } catch (e) {
    console.error(e)
    throw new HTTPException(500, { message: 'Failed to parse credential' })
  }
})
