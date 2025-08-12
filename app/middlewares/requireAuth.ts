import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import * as v from 'valibot'

const sessionSchema = v.object({
  createdAt: v.number(),
})

export const requireAuth = createMiddleware(async (c, next) => {
  let session: v.InferInput<typeof sessionSchema> | undefined
  const sessionCookie = getCookie(c, 'sessionId')
  if (sessionCookie) {
    const sessionData = await c.env.KV.get(`session:${sessionCookie}`, 'json')
    session = v.parse(sessionSchema, sessionData)
  }

  if (session) {
    c.set('session', session)
    return next()
  }

  if (c.req.path !== '/login') {
    return c.redirect('/login')
  }

  return next()
})
