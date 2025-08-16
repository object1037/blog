import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { Meta } from '../../../components/meta'
import { TagList } from '../../../components/tagList'
import { getPostByID } from '../../../services/db'
import { markdownToHtml } from '../../../services/markdown'

export default createRoute(
  vValidator(
    'param',
    v.object({
      id: v.pipe(v.string(), v.transform(Number), v.number()),
    }),
  ),
  async (c) => {
    const { id } = c.req.valid('param')
    const post = await getPostByID(c.env.DB, id)
    if (!post) {
      return c.notFound()
    }

    const parsed = markdownToHtml(post.content)

    return c.render(
      <>
        <Meta
          title={post.title}
          description={post.description}
          url={c.req.url}
          type="article"
        />
        <TagList tags={post.tags.map((tag) => ({ name: tag, count: 0 }))} />
        <div
          class="markdown_wrapper"
          /** biome-ignore lint/security/noDangerouslySetInnerHtml: html is safe */
          dangerouslySetInnerHTML={{ __html: parsed }}
        />
      </>,
      { heading: post.title },
    )
  },
)
