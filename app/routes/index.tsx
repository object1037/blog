import { createRoute } from 'honox/factory'
import { Meta } from '../components/meta'
import { PostList } from '../components/postList'
import { getPublicPosts } from '../services/db'

export default createRoute(async (c) => {
  const posts = await getPublicPosts(c.env.DB)

  return c.render(
    <>
      <Meta title="" description="object1037 Blog" url={c.req.url} />
      <PostList posts={posts} />
    </>,
    { heading: 'Posts' },
  )
})
