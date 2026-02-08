import { css } from '../../styled-system/css'
import { button, container, hstack } from '../../styled-system/patterns'
import { Icon } from './icon'

export const Header = ({ dashboard }: { dashboard: boolean }) => {
  const headerStackStyle = hstack({
    justify: 'space-between',
    p: '2',
  })
  const topLinkStackStyle = hstack({
    gap: '1',
    py: '3',
    px: { base: '0', md: '2', lg: '4' },
  })
  const hpLinkStyle = css({
    fontSize: '5xl',
    rounded: 'full',
    p: '1',
    ml: '-1',
    _hover: { bg: '[#fff5f6]' },
  })
  const topLinkStyle = button({
    fontSize: 'lg',
    fontWeight: 'medium',
    lineHeight: 'none',
    p: '2',
  })
  const navButtonStyle = button({
    py: '2',
    px: { base: '3', md: '4' },
  })

  return (
    <header class={container()}>
      <nav class={headerStackStyle}>
        <div class={topLinkStackStyle}>
          <a href="https://object1037.dev" class={hpLinkStyle}>
            <Icon mono={dashboard} />
          </a>
          <a href={dashboard ? '/dashboard' : '/'} class={topLinkStyle}>
            <span>{dashboard ? 'Dash' : 'Blog'}</span>
          </a>
        </div>
        <a href="/tags" class={navButtonStyle}>
          Tags
        </a>
      </nav>
    </header>
  )
}
