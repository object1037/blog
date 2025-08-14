import type { Env } from 'hono'
import { deleteCookie, getSignedCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import * as v from 'valibot'

const sessionSchema = v.object({
  createdAt: v.number(),
  userAgent: v.string(),
})

export const requireAuth = createMiddleware<Env>(async (c, next) => {
  let session: v.InferInput<typeof sessionSchema> | undefined
  const sessionId = await getSignedCookie(c, c.env.SECRET, 'sessionId')
  if (sessionId) {
    const sessionData = await c.env.KV.get(`session:${sessionId}`, 'json')
    const result = v.safeParse(sessionSchema, sessionData)
    if (result.success) {
      session = result.output
    } else {
      deleteCookie(c, 'sessionId', {
        secure: true,
      })
    }
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
