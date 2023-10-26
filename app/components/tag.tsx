import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'

export const Tag = ({ name }: { name: string }) => {
  const tagStyle = css({
    py: '1.5',
    px: '3',
    borderColor: 'neutral.200',
    borderWidth: '1px',
    rounded: 'sm',
    display: 'inline-block',
    fontSize: 'sm',
    fontWeight: 'medium',
    color: 'neutral.700',
    _hover: { bg: 'neutral.200' },
    transition: 'background',
  })

  return (
    <Link to={`../tags/${name}`} prefetch="intent" className={tagStyle}>
      {name}
    </Link>
  )
}
