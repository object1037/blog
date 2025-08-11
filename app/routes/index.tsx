import { createRoute } from 'honox/factory'
import { getPublicPosts } from '../services/db'

export default createRoute(async (c) => {
  const posts = await getPublicPosts(c.env.DB)

  return c.render(
    <div>
      <title>ゆるふわインターネット</title>
      <h1>Posts</h1>
      <ul>
        {posts.map(({ id, title, description }) => (
          <li key={id}>
            <a href={`/posts/${id}`}>
              <h2>{title}</h2>
              <p>{description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>,
  )
})
