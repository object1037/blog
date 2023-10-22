import { Link } from '@remix-run/react'

import { type getPosts } from '~/db.server'

export const PostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number]
}) => {
  return (
    <li>
      <Link to={`/posts/${post.id}`} prefetch="intent">
        {post.title}
      </Link>
    </li>
  )
}
