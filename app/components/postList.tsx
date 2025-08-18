import { css } from '../../styled-system/css'
import { vstack } from '../../styled-system/patterns'
import type { Posts } from '../services/db'
import { PostCard } from './postCard'

export const PostList = ({ posts }: { posts: Posts }) => {
  return (
    <div class={vstack({ gap: '6' })}>
      {posts.map((post) => (
        <article key={post.id} class={css({ w: 'full' })}>
          <PostCard post={post} />
        </article>
      ))}
    </div>
  )
}
