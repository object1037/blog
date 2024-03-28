import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

import { type getPosts } from '~/.server/db'

export const PostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number]
}) => {
  const itemStyle = css({
    rounded: 'lg',
    borderWidth: '[1px]',
    borderColor: { base: 'neutral.200', _hover: 'neutral.400' },
    mb: '6',
    transition: 'colors',
  })
  const linkStyle = flex({
    justify: 'space-between',
    gap: '4',
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
  })

  return (
    <li className={itemStyle}>
      <Link to={`/posts/${post.id}`} prefetch="viewport" className={linkStyle}>
        <div>
          <p className={titleStyle}>{post.title}</p>
          <p>{post.description}</p>
        </div>
        <p className={idStyle}>{post.id}</p>
      </Link>
    </li>
  )
}
