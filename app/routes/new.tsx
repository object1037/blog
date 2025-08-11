import { createRoute } from 'honox/factory'
import { requireAuth } from '../middlewares/requireAuth'

export default createRoute(requireAuth, (c) => {
  return c.render(<h1>New post</h1>)
})
