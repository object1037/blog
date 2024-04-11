import { wrap } from 'styled-system/patterns'

import type { getTags } from '~/.server/db'
import { Tag } from './tag'

export const TagList = ({
  tagDatas,
}: { tagDatas: Awaited<ReturnType<typeof getTags>> }) => {
  return (
    <ul className={wrap()}>
      {tagDatas.map((tagData) => (
        <li key={tagData.tagName}>
          <Tag tagData={tagData} />
        </li>
      ))}
    </ul>
  )
}
