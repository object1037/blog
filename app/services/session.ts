import type { Context, Env } from 'hono'
import { deleteCookie, setSignedCookie } from 'hono/cookie'
import * as v from 'valibot'

const sessionSchema = v.object({
  createdAt: v.number(),
  userAgent: v.string(),
})

export const createSession = async (c: Context<Env>) => {
  const sessionId = crypto.randomUUID()

  await Promise.all([
    setSignedCookie(c, 'sessionId', sessionId, c.env.SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 86400, // 1 Day
    }),
    c.env.KV.put(`session:${sessionId}`, '', {
      expirationTtl: 86400,
      metadata: {
        createdAt: Date.now(),
        userAgent: c.req.header('User-Agent'),
      },
    }),
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

export const getSessions = async (c: Context<Env>) => {
  const { keys } = await c.env.KV.list({ prefix: 'session:' })
  const sessions: {
    id: string
    createdAt: number
    userAgent: string
  }[] = []
  keys.forEach((key) => {
    const result = v.safeParse(sessionSchema, key.metadata)
    if (result.success) {
      sessions.push({
        ...result.output,
        id: key.name.split(':')[1] ?? '',
      })
    }
  })

  return sessions
}
