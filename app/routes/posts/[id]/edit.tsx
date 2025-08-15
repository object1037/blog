import { createRoute } from 'honox/factory'
import { EditPage } from '../../../components/editPage'
import { requireAuth } from '../../../middlewares/requireAuth'
import { getPostByID } from '../../../services/db'

export default createRoute(requireAuth, async (c) => {
  const id = c.req.param('id')
  const post = await getPostByID(c.env.DB, id)
  if (!post) {
    return c.notFound()
  }

  return c.render(<EditPage content={post.content} errors={[]} />, {
    heading: `Edit Post: ${post.title}`,
  })
})
