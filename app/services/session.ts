import type { Context } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'

export const createSession = async (c: Context) => {
  const sessionId = crypto.randomUUID()
  setCookie(c, 'sessionId', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 86400,
  })
  await c.env.KV.put(
    `session:${sessionId}`,
    JSON.stringify({
      createdAt: Date.now(),
      userAgent: c.req.header('User-Agent'),
    }),
    { expirationTtl: 86400 }, // 1 Day
  )
}

export const deleteSession = async (c: Context) => {
  const deletedCookie = deleteCookie(c, 'sessionId', {
    secure: true,
  })
  if (!deletedCookie) return
  await c.env.KV.delete(`session:${deletedCookie}`)
}
