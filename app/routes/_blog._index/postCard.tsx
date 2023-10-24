import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'

import { type getPosts } from '~/db.server'

export const PostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number]
}) => {
  return (
    <li
      className={css({
        h: '20',
        borderColor: 'gray.900',
        borderBottomWidth: { base: '1px', _last: '0px' },
      })}
    >
      <Link
        to={`/posts/${post.id}`}
        prefetch="intent"
        className={css({
          display: 'block',
          h: '100%',
          fontWeight: 'medium',
          p: '4',
        })}
      >
        {post.title}
      </Link>
    </li>
  )
}
