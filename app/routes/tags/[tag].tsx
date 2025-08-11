import { createRoute } from 'honox/factory'
import { getPostsWithTag } from '../../api/db'

export default createRoute(async (c) => {
  const tag = c.req.param('tag')
  const postsWithTag = await getPostsWithTag(c.env.DB, tag)

  if (postsWithTag.length === 0) {
    return c.notFound()
  }

  return c.render(
    <div>
      <title>{tag}</title>
      <h1>Tag: {tag}</h1>
      <ul>
        {postsWithTag.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>,
  )
})
