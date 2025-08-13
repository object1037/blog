import { createRoute } from 'honox/factory'
import { PostCard } from '../components/postCard'
import { getPublicPosts } from '../services/db'

export default createRoute(async (c) => {
  const posts = await getPublicPosts(c.env.DB)

  return c.render(
    <div>
      <title>ゆるふわインターネット</title>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>,
  )
})
