import { wrap } from 'styled-system/patterns'

import { Tag } from './tag'

export const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <ul className={wrap()}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag name={tag} />
        </li>
      ))}
    </ul>
  )
}
