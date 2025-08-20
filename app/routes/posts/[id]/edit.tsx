import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { EditPage } from '../../../components/editPage'
import { requireAuth } from '../../../middlewares/requireAuth'
import { getPostByID } from '../../../services/db'

export default createRoute(
  requireAuth,
  vValidator(
    'param',
    v.object({
      id: v.pipe(v.string(), v.transform(Number), v.number()),
    }),
  ),
  async (c) => {
    const { id } = c.req.valid('param')
    const post = await getPostByID(c.env.DB, id, true)
    if (!post) {
      return c.notFound()
    }
    const { objects } = await c.env.BUCKET.list()

    return c.render(
      <EditPage
        content={post.content}
        errors={[]}
        images={objects.map((obj) => obj.key)}
      />,
      {
        heading: `Edit: ${post.title}`,
        isDashboard: true,
      },
    )
  },
)
