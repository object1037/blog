import { createRoute } from 'honox/factory'
import { TagList } from '../../components/tagList'
import { getPostByID } from '../../services/db'
import { markdownToHtml } from '../../services/markdoc'

export default createRoute(async (c) => {
  const id = c.req.param('id')
  const post = await getPostByID(c.env.DB, id)
  if (!post) {
    return c.notFound()
  }

  const parsed = markdownToHtml(post.content)

  return c.render(
    <div>
      <h1>Post {id}</h1>
      <h2>{post.title}</h2>
      <TagList tags={post.tags.map((tag) => ({ name: tag, count: 0 }))} />
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: html is safe */}
      <div dangerouslySetInnerHTML={{ __html: parsed }} />
    </div>,
  )
})
