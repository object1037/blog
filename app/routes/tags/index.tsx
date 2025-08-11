import { createRoute } from 'honox/factory'
import { getTags } from '../../services/db'

export default createRoute(async (c) => {
  const tags = await getTags(c.env.DB)

  return c.render(
    <div>
      <title>Blog Tags</title>
      <h1>Tags</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.name}>
            {tag.name} {tag.count}
          </li>
        ))}
      </ul>
    </div>,
  )
})
