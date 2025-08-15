import { css, cx } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'
import type { Posts } from '../services/db'

export const PostCard = ({ post }: { post: Posts[number] }) => {
  const itemStyle = flex({
    rounded: 'lg',
    borderWidth: '[1px]',
    borderColor: { base: 'neutral.200', _hover: 'neutral.400' },
    transition: 'colors',
    overflow: 'hidden',
    justify: 'space-between',
    gap: '2',
    p: '4',
  })
  const titleStyle = css({
    fontWeight: 'semibold',
    fontSize: 'xl',
    mb: '4',
  })
  const idStyle = css({
    fontFamily: 'mono',
    fontSize: 'sm',
    color: 'neutral.700',
    writingMode: 'vertical-rl',
    borderLeftWidth: '[1px]',
    borderStyle: 'dashed',
    borderColor: 'neutral.200',
    mx: '-2',
    px: '2',
    pl: '3.5',
    transition: 'colors',
    _groupHover: {
      borderStyle: 'solid',
      borderColor: 'neutral.400',
    },
  })

  return (
    <a href={`/posts/${post.id}`} class={cx('group', itemStyle)}>
      <div>
        <h2 class={titleStyle}>{post.title}</h2>
        <p>{post.description}</p>
      </div>
      <p class={idStyle}>{post.id}</p>
    </a>
  )
}
