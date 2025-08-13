import type { Posts } from '../services/db'

export const PostCard = ({ post }: { post: Posts[number] }) => {
  return (
    <a href={`/posts/${post.id}`}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </a>
  )
}
