import { createRoute } from 'honox/factory'
import { PostCard } from '../components/postCard'
import { getPublicPosts } from '../services/db'

export default createRoute(async (c) => {
  const posts = await getPublicPosts(c.env.DB)

  return c.render(
    <div>
      <title>ゆるふわインターネット</title>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>,
    { heading: 'Posts' },
  )
})
