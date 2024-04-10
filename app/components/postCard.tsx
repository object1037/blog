import { Link } from '@remix-run/react'

import { css, cx } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

import type { getPosts } from '~/.server/db'

export const PostCard = ({
  post,
  children,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number]
  children?: React.ReactNode
}) => {
  const itemStyle = flex({
    rounded: 'lg',
    borderWidth: '[1px]',
    borderColor: { base: 'neutral.200', _hover: 'neutral.400' },
    mb: '6',
    transition: 'colors',
    overflow: 'hidden',
  })
  const linkStyle = flex({
    grow: '1',
    justify: 'space-between',
    gap: '2',
    p: '4',
  })
  const titleStyle = css({
    fontWeight: 'semibold',
    fontSize: 'xl',
    mb: '4',
  })
  const idStyle = css({
    fontFamily: 'mono',
    fontSize: 'sm',
    color: 'neutral.700',
    writingMode: 'vertical-rl',
    borderLeftWidth: '[1px]',
    borderStyle: 'dashed',
    borderColor: 'neutral.200',
    mx: '-2',
    px: '2',
    pl: '3.5',
    transition: 'colors',
    _groupHover: {
      borderStyle: 'solid',
      borderColor: 'neutral.400',
    },
  })

  return (
    <li className={cx('group', itemStyle)}>
      <Link to={`/posts/${post.id}`} prefetch="viewport" className={linkStyle}>
        <div>
          <p className={titleStyle}>{post.title}</p>
          <p>{post.description}</p>
        </div>
        <p className={idStyle}>{post.id}</p>
      </Link>
      {children}
    </li>
  )
}
