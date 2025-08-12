import { createRoute } from 'honox/factory'
import { deleteSession } from '../services/session'

export const POST = createRoute(async (c) => {
  await deleteSession(c)
  return c.redirect('/')
})
