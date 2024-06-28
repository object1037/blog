import { Form, Link } from '@remix-run/react'

import { css } from 'styled-system/css'
import { button, container, hstack } from 'styled-system/patterns'

import { Icon } from './icon'

export const Header = ({ dashboard }: { dashboard?: boolean }) => {
  const headerStackStyle = hstack({
    justify: 'space-between',
    p: '2',
  })
  const topLinkStyle = hstack({
    gap: '4',
    fontSize: '5xl',
    py: '4',
    px: { base: '0', md: '2', lg: '4' },
  })
  const topTextStyle = css({
    fontSize: 'lg',
    fontWeight: 'medium',
    lineHeight: 'none',
  })
  const navTextStyle = button({
    py: '2',
    px: { base: '3', md: '4' },
  })

  return (
    <header className={container()}>
      <nav className={headerStackStyle}>
        <Link to="/" prefetch="intent" className={topLinkStyle}>
          <Icon mono={!!dashboard} />{' '}
          <span className={topTextStyle}>{dashboard ? 'Dash' : 'Blog'}</span>
        </Link>
        {dashboard ? (
          <Form action="/logout" method="POST">
            <button type="submit" className={navTextStyle}>
              Logout
            </button>
          </Form>
        ) : (
          <Link to="/tags" prefetch="intent" className={navTextStyle}>
            Tags
          </Link>
        )}
      </nav>
    </header>
  )
}
