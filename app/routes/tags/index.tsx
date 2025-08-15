import { createRoute } from 'honox/factory'
import { TagList } from '../../components/tagList'
import { getTags } from '../../services/db'

export default createRoute(async (c) => {
  const tags = await getTags(c.env.DB)

  return c.render(
    <div>
      <title>Blog Tags</title>
      <TagList tags={tags} />
    </div>,
    { heading: 'Tags' },
  )
})
