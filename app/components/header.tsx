import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'
import { container, hstack } from 'styled-system/patterns'

import { Icon } from './icon'

export const Header = () => {
  const headerStackStyle = hstack({
    justify: 'space-between',
    p: '2',
  })
  const topLinkStyle = hstack({
    gap: '1rem',
    fontSize: '5xl',
    py: '4',
    px: { base: '0', md: '2', lg: '4' },
  })
  const topTextStyle = css({
    fontSize: 'lg',
    fontWeight: 'medium',
    lineHeight: '1',
  })
  const navTextStyle = css({
    fontSize: 'sm',
    fontWeight: 'medium',
    py: '2',
    px: { base: '3', md: '4' },
    rounded: 'sm',
    _hover: { bg: 'neutral.200' },
    transition: 'background',
  })

  return (
    <header className={container({ w: '100%' })}>
      <nav className={headerStackStyle}>
        <Link to="/" prefetch='intent' className={topLinkStyle}>
          <Icon /> <span className={topTextStyle}>Blog</span>
        </Link>
        <Link to="/tags" prefetch='intent' className={navTextStyle}>
          Tags
        </Link>
      </nav>
    </header>
  )
}
