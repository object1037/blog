import { useContext } from 'hono/jsx'
import { createRoute } from 'honox/factory'
import { PostsContext } from '../_renderer'

export default createRoute((c) => {
  const { tagInfos } = useContext(PostsContext)
  
  return c.render(
    <div class="py-8 text-center">
      <title>Blog Tags</title>
      <h1 class="text-3xl font-bold">Tags</h1>
      <ul>
        {tagInfos.map(([name, postInfos]) => (
          <li key={name}>
            <a href={`/tags/${name}`}>
              {name} ({postInfos.length})
            </a>
          </li>
        ))}
      </ul>
    </div>,
  )
})
