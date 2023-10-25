import { type SerializeFrom } from '@remix-run/cloudflare'

import { PostCard } from './postCard'
import { type getPosts } from '~/db.server'

export const PostList = ({
  posts,
}: {
  posts: SerializeFrom<Awaited<ReturnType<typeof getPosts>>>
}) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  )
}
