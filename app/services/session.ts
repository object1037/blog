import type { Context, Env } from 'hono'
import { deleteCookie, setSignedCookie } from 'hono/cookie'
import * as v from 'valibot'

const sessionSchema = v.object({
  createdAt: v.number(),
  userAgent: v.string(),
})

export type Session = Awaited<ReturnType<typeof getSessions>>[number]

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

export const deleteSession = async (c: Context<Env>, id: string) => {
  const sessionId = c.get('sessionId')
  if (sessionId === id) {
    await Promise.all([
      deleteCookie(c, 'sessionId', {
        secure: true,
      }),
      c.env.KV.delete(`session:${id}`),
    ])
    return { loggedOutSelf: true }
  }

  await c.env.KV.delete(`session:${id}`)
  return { loggedOutSelf: false }
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
