import { createRoute } from 'honox/factory'
import { Meta } from '../../components/meta'
import { TagList } from '../../components/tagList'
import { getTags } from '../../services/db'

export default createRoute(async (c) => {
  const tags = await getTags(c.env.DB)

  return c.render(
    <>
      <Meta title="Tags" description="タグ一覧" url={c.req.url} />
      <TagList tags={tags} />
    </>,
    { heading: 'Tags' },
  )
})
