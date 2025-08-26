import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { Meta } from '../components/meta'
import { PostList } from '../components/postList'
import { getPublicPosts } from '../services/db'

export default createRoute(
  vValidator(
    'query',
    v.object({
      cursor: v.exactOptional(
        v.pipe(v.string(), v.transform(Number), v.number()),
      ),
    }),
  ),
  async (c) => {
    const { cursor } = c.req.valid('query')
    const posts = await getPublicPosts(c.env.DB, 5, cursor)

    if (posts.length === 0) {
      return c.redirect('/')
    }

    return c.render(
      <>
        <Meta title="" description="object1037 Blog" url={c.req.url} />
        <PostList posts={posts} />
      </>,
      { heading: 'Posts' },
    )
  },
)
