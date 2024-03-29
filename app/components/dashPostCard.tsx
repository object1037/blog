import { Form } from '@remix-run/react'

import { css, cx } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

import { PostCard } from './postCard'
import { type getAllPosts } from '~/.server/db'

export const DashPostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getAllPosts>>[number]
}) => {
  const formStyle = flex({
    position: 'relative',
    borderLeftWidth: '[1px]',
    borderStyle: 'dashed',
    borderColor: 'neutral.200',
    transition: 'colors',
    _groupHover: {
      borderStyle: 'solid',
      borderColor: 'neutral.400',
    },
  })
  const buttonStyle = css({
    p: '4',
    fontFamily: 'mono',
    fontSize: 'sm',
    color: 'neutral.700',
    writingMode: 'vertical-rl',
    textAlign: 'left',
    cursor: 'pointer',
  })

  return (
    <PostCard post={post}>
      <Form action={`/posts/${post.id}/edit`} className={formStyle}>
        <button
          className={cx(buttonStyle, css({ _hover: { bg: 'neutral.200' } }))}
        >
          EDIT
        </button>
      </Form>
      <Form
        action={`/posts/${post.id}/delete`}
        method="post"
        navigate={false}
        className={formStyle}
      >
        <button className={cx(buttonStyle, css({ _hover: { bg: 'red.200' } }))}>
          DELETE
        </button>
      </Form>
    </PostCard>
  )
}
