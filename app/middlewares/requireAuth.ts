import { createMiddleware } from 'hono/factory'

export const requireAuth = createMiddleware(async (c, next) => {
  console.log('auth required')
  const isAuth = false
  if (!isAuth) {
    return c.redirect('/login')
  }
  await next()
  c.res.headers.set('Cache-Control', 'private, no-cache')
  return
})
