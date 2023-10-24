import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

import { type getPosts } from '~/db.server'

export const PostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number]
}) => {
  return (
    <li
      className={css({
        h: '24',
        borderColor: 'gray.900',
        borderBottomWidth: { base: '1px', _last: '0px' },
      })}
    >
      <Link
        to={`/posts/${post.id}`}
        prefetch="intent"
        className={flex({
          direction: 'column',
          justify: 'space-between',
          h: '100%',
          p: '4',
        })}
      >
        <p className={css({ fontWeight: 'medium', fontSize: 'xl' })}>
          {post.title}
        </p>
        <p>{post.description}</p>
      </Link>
    </li>
  )
}
