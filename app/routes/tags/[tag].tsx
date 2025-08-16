import { createRoute } from 'honox/factory'
import { Meta } from '../../components/meta'
import { PostCard } from '../../components/postCard'
import { getPostsWithTag } from '../../services/db'

export default createRoute(async (c) => {
  const tag = c.req.param('tag')
  const postsWithTag = await getPostsWithTag(c.env.DB, tag)

  if (postsWithTag.length === 0) {
    return c.notFound()
  }

  return c.render(
    <>
      <Meta
        title={`Tag: ${tag}`}
        description={`"${tag}"に関する記事一覧`}
        url={c.req.url}
      />
      <div>
        <ul>
          {postsWithTag.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </>,
    { heading: tag },
  )
})
