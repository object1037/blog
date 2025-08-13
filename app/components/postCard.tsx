import type { getPublicPosts } from '../services/db'

export const PostCard = ({
  post,
}: {
  post: NonNullable<Awaited<ReturnType<typeof getPublicPosts>>>[number]
}) => {
  return (
    <a href={`/posts/${post.id}`}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </a>
  )
}
