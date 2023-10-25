import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'

export const Tag = ({ name }: { name: string }) => {
  const tagStyle = css({
    py: '2',
    px: '3',
    borderColor: 'neutral.200',
    borderWidth: '1px',
    rounded: 'sm',
    w: 'fit-content',
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
