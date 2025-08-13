import type { getTags } from '../services/db'

export const TagList = ({
  tags,
}: {
  tags: Awaited<ReturnType<typeof getTags>>
}) => {
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag.name}>
          <a href={`/tags/${tag.name}`}>{tag.name}</a>
          <span>({tag.count})</span>
        </li>
      ))}
    </ul>
  )
}
