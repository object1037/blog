import { type ComponentPropsWithoutRef } from 'react'

import { LuGithub, LuTwitter } from 'react-icons/lu'
import { css } from 'styled-system/css'
import { container, hstack } from 'styled-system/patterns'

const IconLink = (props: ComponentPropsWithoutRef<'a'>) => {
  const iconLinkStyle = css({
    py: '4',
    px: { base: '3', md: '4' },
    fontSize: '3xl',
    _hover: { color: 'neutral.400' },
    transition: 'colors',
  })

  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={iconLinkStyle}
    >
      {props.children}
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
    <footer className={container({ w: '100%' })}>
      <div className={footerStackStyle}>
        <div className={hstack()}>
          <IconLink href="https://twitter.com/object1037">
            <LuTwitter />
          </IconLink>
          <IconLink href="https://github.com/object1037">
            <LuGithub />
          </IconLink>
        </div>
        <p className={copyStyle}>&copy; object1037</p>
      </div>
    </footer>
  )
}
