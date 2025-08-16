import { createRoute } from 'honox/factory'
import { Meta } from '../components/meta'
import { PostCard } from '../components/postCard'
import { getPublicPosts } from '../services/db'

export default createRoute(async (c) => {
  const posts = await getPublicPosts(c.env.DB)

  return c.render(
    <>
      <Meta title="" description="object1037 Blog" url={c.req.url} />
      {posts.map((post) => (
        <article key={post.id}>
          <PostCard post={post} />
        </article>
      ))}
    </>,
    { heading: 'Posts' },
  )
})
