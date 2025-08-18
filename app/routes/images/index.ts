import { createRoute } from 'honox/factory'
import { requireAuth } from '../../middlewares/requireAuth'

export default createRoute(requireAuth, async (c) => {
  const { objects } = await c.env.BUCKET.list()

  return c.json({
    images: objects.map((obj) => obj.key),
  })
})
