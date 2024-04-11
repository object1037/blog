import { Link } from '@remix-run/react'
import { css, cx } from 'styled-system/css'

import { button } from 'styled-system/patterns'
import type { getTags } from '~/.server/db'

export const Tag = ({
  tagData,
}: { tagData: Awaited<ReturnType<typeof getTags>>[number] }) => {
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
    <Link
      to={`/tags/${tagData.tagName}`}
      prefetch="intent"
      className={cx('group', tagStyle)}
    >
      <span>{tagData.tagName}</span>
      {tagData.count > 0 && <span className={countStyle}>{tagData.count}</span>}
    </Link>
  )
}
