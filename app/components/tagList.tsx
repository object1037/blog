import { css } from 'styled-system/css'
import { wrap } from 'styled-system/patterns'

import { Tag } from './tag'

export const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <ul className={wrap()}>
      {tags.map((tag) => (
        <li key={tag} className={css({ display: 'inline' })}>
          <Tag name={tag} />
        </li>
      ))}
    </ul>
  )
}
