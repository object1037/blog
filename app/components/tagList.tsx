import { css, cx } from '../../styled-system/css'
import { button, wrap } from '../../styled-system/patterns'
import type { Tags } from '../services/db'

export const TagList = ({ tags }: { tags: Tags }) => {
  const tagStyle = button({
    display: 'flex',
    py: '1.5',
    px: '3',
    gap: '2',
    color: 'neutral.700',
    borderColor: 'neutral.200',
    divideColor: { base: 'neutral.200', _hover: 'neutral.300' },
    borderWidth: '[1px]',
    divideX: '1px',
    transition: 'colors',
  })
  const countStyle = css({
    pl: '2',
    color: { base: 'neutral.400', _groupHover: 'neutral.500' },
  })

  return (
    <ul class={wrap()}>
      {tags.map((tag) => (
        <li key={tag.name}>
          <a href={`/tags/${tag.name}`} class={cx('group', tagStyle)}>
            <span>{tag.name}</span>
            {tag.count > 0 && <span class={countStyle}>{tag.count}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
