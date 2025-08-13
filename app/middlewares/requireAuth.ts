import { deleteCookie, getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import * as v from 'valibot'

const sessionSchema = v.object({
  createdAt: v.number(),
  userAgent: v.string(),
})

export const requireAuth = createMiddleware(async (c, next) => {
  let session: v.InferInput<typeof sessionSchema> | undefined
  const sessionCookie = getCookie(c, 'sessionId')
  if (sessionCookie) {
    const sessionData = await c.env.KV.get(`session:${sessionCookie}`, 'json')
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
