import { createRoute } from 'honox/factory'
import type { Frontmatter } from '../types'

export default createRoute((c) => {
  const posts = import.meta.glob<{ frontmatter: Frontmatter }>('./posts/*.mdx', {
    eager: true,
  })

  return c.render(
    <div class="py-8 text-center">
      <title>ゆるふわインターネット</title>
      <h1>Posts</h1>
      <ul>
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li>
                <a href={`${id.replace(/\.mdx$/, '')}`}>
                  {module.frontmatter.title}
                </a>
              </li>
            )
          }
          return null
        })}
      </ul>
    </div>,
  )
})
