import { css } from '../../styled-system/css'
import { button, container, hstack } from '../../styled-system/patterns'
import { Icon } from './icon'

export const Header = ({ dashboard }: { dashboard: boolean }) => {
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
    <header class={container()}>
      <nav class={headerStackStyle}>
        <a href={dashboard ? '/dashboard' : '/'} class={topLinkStyle}>
          <Icon mono={dashboard} />
          <span class={topTextStyle}>{dashboard ? 'Dash' : 'Blog'}</span>
        </a>
        <a href="/tags" class={navTextStyle}>
          Tags
        </a>
      </nav>
    </header>
  )
}
