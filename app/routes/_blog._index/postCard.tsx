import { Link } from '@remix-run/react'

import { css, cx } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

import { type getPosts } from '~/db.server'

const itemStyle = css({
  h: '24',
  borderColor: 'gray.900',
  borderBottomWidth: { base: '1px', _last: '0px' },
})
const linkStyle = flex({
  direction: 'column',
  justify: 'space-between',
  h: '100%',
  p: '4',
})
const titleStyle = css({
  fontWeight: 'medium',
  fontSize: 'xl',
  w: 'fit-content',
  bgRepeat: 'no-repeat',
  bgGradient: 'to-b',
  gradientFrom: 'transparent 70%',
  gradientTo: 'token(colors.secondary) 70%',
  bgSize: { base: '0% 100%', _groupHover: '100% 100%' },
  transition: 'background',
})

export const PostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number]
}) => {
  return (
    <li className={cx('group', itemStyle)}>
      <Link to={`/posts/${post.id}`} prefetch="intent" className={linkStyle}>
        <p className={titleStyle}>{post.title}</p>
        <p>{post.description}</p>
      </Link>
    </li>
  )
}