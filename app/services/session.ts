import type { Context, Env } from 'hono'
import { deleteCookie, setSignedCookie } from 'hono/cookie'

export const createSession = async (c: Context<Env>) => {
  const sessionId = crypto.randomUUID()

  await Promise.all([
    setSignedCookie(c, 'sessionId', sessionId, c.env.SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 86400,
    }),
    c.env.KV.put(
      `session:${sessionId}`,
      JSON.stringify({
        createdAt: Date.now(),
        userAgent: c.req.header('User-Agent'),
      }),
      { expirationTtl: 86400 }, // 1 Day
    ),
  ])
}

export const deleteSession = async (c: Context<Env>) => {
  const deletedCookie = deleteCookie(c, 'sessionId', {
    secure: true,
  })
  if (!deletedCookie) return
  const sessionId = deletedCookie.split('.')[0]
  await c.env.KV.delete(`session:${sessionId}`)
}
