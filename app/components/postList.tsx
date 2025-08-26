import { ChevronRight } from 'lucide'
import { css } from '../../styled-system/css'
import { hstack, vstack } from '../../styled-system/patterns'
import type { Posts } from '../services/db'
import { LucideIcon } from './lucideIcon'
import { PostCard } from './postCard'

export const PostList = ({
  posts,
  dash = false,
}: {
  posts: Posts
  dash?: boolean
}) => {
  const lastId = posts[posts.length - 1]?.id

  const buttonStyle = css({
    rounded: 'full',
    p: '2.5',
    fontSize: 'xl',
    transition: 'background',
    _hover: {
      bg: 'neutral.200',
    },
  })

  return (
    <>
      <div class={vstack({ gap: '6' })}>
        {posts.map((post) => (
          <article key={post.id} class={css({ w: 'full' })}>
            <PostCard post={post} dash={dash} />
          </article>
        ))}
      </div>
      <div class={hstack({ justify: 'space-around', mt: '8' })}>
        <a href={lastId ? `/?cursor=${lastId}` : '/'} class={buttonStyle}>
          <LucideIcon icon={ChevronRight} title="Next" />
        </a>
      </div>
    </>
  )
}
