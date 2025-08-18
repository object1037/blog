import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { requireAuth } from '../middlewares/requireAuth'
import { deleteSession } from '../services/session'

export const POST = createRoute(
  requireAuth,
  vValidator('form', v.object({ id: v.string() })),
  async (c) => {
    const { id } = c.req.valid('form')
    const { loggedOutSelf } = await deleteSession(c, id)

    if (loggedOutSelf) {
      return c.redirect('/')
    }
    return c.redirect('/dashboard')
  },
)
