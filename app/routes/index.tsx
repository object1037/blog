import { useContext } from 'hono/jsx'
import { createRoute } from 'honox/factory'
import { PostsContext } from './_renderer'

export default createRoute((c) => {
  const { postInfos } = useContext(PostsContext)

  return c.render(
    <div class="py-8 text-center">
      <title>ゆるふわインターネット</title>
      <h1>Posts</h1>
      <ul>
        {postInfos.map((postInfo) => {
          return (
            <li>
              <a href={`/posts/${postInfo.id}`}>{postInfo.title}</a>
            </li>
          )
        })}
      </ul>
    </div>,
  )
})
