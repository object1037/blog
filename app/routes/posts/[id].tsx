import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import { getPostByID } from '../../api/db'
import { parseMarkdown } from '../../api/parseMarkDown'

export default createRoute(async (c) => {
  const id_txt = c.req.param('id')
  const id = parseInt(id_txt, 10)
  if (Number.isNaN(id)) {
    throw new HTTPException(400, { message: 'Invalid post ID' })
  }
  const post = await getPostByID(c.env.DB, id)
  if (!post) {
    return c.notFound()
  }

  const parsed = parseMarkdown(post.content)

  return c.render(
    <div>
      <h1>Post {id}</h1>
      <h2>{post.title}</h2>
      <ul>
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: html is safe */}
      <div dangerouslySetInnerHTML={{ __html: parsed }} />
    </div>,
  )
})
