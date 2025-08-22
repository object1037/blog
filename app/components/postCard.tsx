import { css, cx } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'
import { getDatetime } from '../lib/getDatetime'
import type { Posts } from '../services/db'

export const PostCard = ({
  post,
  dash = false,
}: {
  post: Posts[number]
  dash?: boolean
}) => {
  const itemStyle = flex({
    rounded: 'lg',
    borderWidth: '[1px]',
    borderColor: { base: 'neutral.200', _hover: 'neutral.400' },
    transition: 'colors',
    overflow: 'hidden',
  })
  const linkStyle = flex({
    grow: '1',
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
  const editButtonStyle = css({
    p: '4',
    fontFamily: 'mono',
    fontSize: 'sm',
    color: 'neutral.700',
    writingMode: 'vertical-rl',
    textAlign: 'left',
    cursor: 'pointer',
    borderLeftWidth: '[1px]',
    borderStyle: 'dashed',
    borderColor: 'neutral.200',
    transition: 'colors',
    _groupHover: {
      borderStyle: 'solid',
      borderColor: 'neutral.400',
    },
    _hover: {
      bg: 'neutral.200',
    },
  })

  const dateTime = getDatetime(post.id)

  return (
    <div
      class={cx(
        'group',
        itemStyle,
        post.public === false && css({ borderColor: 'orange.300' }),
      )}
    >
      <a href={`/posts/${post.id}`} class={linkStyle}>
        <div>
          <h2 class={titleStyle}>{post.title}</h2>
          <p>{post.description}</p>
        </div>
        <time class={idStyle} datetime={dateTime}>
          {post.id}
        </time>
      </a>
      {dash && (
        <a href={`/posts/${post.id}/edit`} class={editButtonStyle}>
          EDIT
        </a>
      )}
    </div>
  )
}
