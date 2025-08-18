import type { JSX, PropsWithChildren } from 'hono/jsx'
import { Github, type IconNode, Twitter } from 'lucide'
import { css } from '../../styled-system/css'
import { container, hstack } from '../../styled-system/patterns'
import { LucideIcon, type WithRequired } from './lucideIcon'

const IconLink = ({
  icon,
  title,
  ...rest
}: WithRequired<PropsWithChildren<JSX.IntrinsicElements['a']>, 'title'> & {
  icon: IconNode
}) => {
  const iconLinkStyle = css({
    py: '4',
    px: { base: '3', md: '4' },
    fontSize: '3xl',
    _hover: { color: 'neutral.400' },
    transition: 'colors',
  })

  return (
    <a {...rest} class={iconLinkStyle}>
      <LucideIcon icon={icon} title={title} />
    </a>
  )
}

export const Footer = () => {
  const footerStackStyle = hstack({
    justify: 'space-between',
    p: '2',
    mb: { base: '8', md: '10', lg: '12' },
  })
  const copyStyle = css({
    py: '4',
    px: { base: '2', md: '4' },
    fontSize: 'xs',
    fontWeight: 'light',
  })

  return (
    <footer class={container()}>
      <div class={footerStackStyle}>
        <address class={hstack()}>
          <IconLink
            href="https://github.com/object1037"
            icon={Github}
            title="GitHub"
          />
          <IconLink
            href="https://twitter.com/object1037"
            icon={Twitter}
            title="Twitter"
          />
        </address>
        <p class={copyStyle}>&copy; object1037</p>
      </div>
    </footer>
  )
}
