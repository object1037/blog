import { Link } from '@remix-run/react'

import { css } from 'styled-system/css';
import { button } from 'styled-system/patterns'

export const Tag = ({ name }: { name: string }) => {
  const tagStyle = button({
    py: '1.5',
    px: '3',
    borderColor: 'neutral.200',
    borderWidth: '[1px]',
    display: 'inline-block',
    color: 'neutral.700',
  })

  return (
    <Link to={`/tags/${name}`} prefetch="intent" className={tagStyle}>
      {name}
    </Link>
  )
}
