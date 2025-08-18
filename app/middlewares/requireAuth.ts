import type { Env } from 'hono'
import { deleteCookie, getSignedCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'

export const requireAuth = createMiddleware<Env>(async (c, next) => {
  let session = false
  const sessionId = await getSignedCookie(c, c.env.SECRET, 'sessionId')
  if (sessionId) {
    const sessionData = await c.env.KV.get(`session:${sessionId}`)
    if (sessionData !== null) {
      session = true
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
