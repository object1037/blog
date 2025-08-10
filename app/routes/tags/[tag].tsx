import { useContext } from 'hono/jsx'
import { ssgParams } from 'hono/ssg'
import { createRoute } from 'honox/factory'
import { PostsContext } from '../_renderer'

export default createRoute(
  ssgParams(() => {
    const { tagInfos } = useContext(PostsContext)
    return tagInfos.map(([name]) => ({ tag: name }))
  }),
  (c) => {
    const tag = c.req.param('tag')
    const { tagInfos } = useContext(PostsContext)
    const postInfos = tagInfos.find(([name]) => name === tag)?.[1] ?? []

    if (postInfos.length === 0) {
      return c.notFound()
    }

    return c.render(
      <div class="py-8 text-center">
        <title>{tag}</title>
        <h1 class="text-3xl font-bold">Tag: {tag}</h1>
        <ul>
          {postInfos.map((postInfo) => (
            <li key={postInfo.id}>
              <a href={`/posts/${postInfo.id}`}>{postInfo.title}</a>
            </li>
          ))}
        </ul>
      </div>,
    )
  },
)
