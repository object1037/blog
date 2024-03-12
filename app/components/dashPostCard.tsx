import { Form, Link } from '@remix-run/react'

import { LuPenSquare, LuTrash } from 'react-icons/lu'
import { css, cx } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

import { type getAllPosts } from '~/.server/db'

export const DashPostCard = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getAllPosts>>[number]
}) => {
  const itemStyle = flex({
    h: '24',
    borderColor: 'neutral.200',
    borderBottomWidth: { base: '[1px]', _last: '[0px]' },
    alignItems: 'center',
    gap: '4',
    p: '4',
  })
  const linkStyle = flex({
    direction: 'column',
    justify: 'space-between',
    flexGrow: '1',
    h: 'full',
  })
  const titleStyle = css({
    fontWeight: 'medium',
    fontSize: 'xl',
  })
  const buttonStyle = css({
    fontSize: 'xl',
    p: '4',
    rounded: 'full',
    bg: 'neutral.100',
    cursor: 'pointer',
  })

  return (
    <li className={cx('group', itemStyle)}>
      <Link to={`/posts/${post.id}`} prefetch="intent" className={linkStyle}>
        <p className={titleStyle}>{post.title}</p>
        <p>{post.description}</p>
      </Link>
      <Form action={`/posts/${post.id}/edit`}>
        <button className={buttonStyle}>
          <LuPenSquare />
        </button>
      </Form>
      <Form action={`/posts/${post.id}/delete`} method="post">
        <button className={buttonStyle}>
          <LuTrash />
        </button>
      </Form>
    </li>
  )
}
