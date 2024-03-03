import { Link } from '@remix-run/react'

import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns'
import { Temporal } from 'temporal-polyfill'

import { type getPosts } from '~/.server/db'

export const PostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number]
}) => {
  const itemStyle = css({
    h: '24',
    borderColor: 'neutral.200',
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

  const postDate = Temporal.PlainDate.from(post.id.toString())

  return (
    <li className={cx('group', itemStyle)}>
      <Link to={`/posts/${post.id}`} prefetch="intent" className={linkStyle}>
        <p className={titleStyle}>{post.title}</p>
        <p>{post.description}</p>
        <p>{postDate.toString()}</p>
      </Link>
    </li>
  )
}
