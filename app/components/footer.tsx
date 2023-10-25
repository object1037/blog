import { type ComponentPropsWithoutRef } from 'react'

import { LuGithub, LuTwitter } from 'react-icons/lu'
import { css } from 'styled-system/css'
import { container, hstack } from 'styled-system/patterns'

const iconLinkStyle = css({
  p: '4',
  fontSize: '3xl',
  _hover: { color: 'neutral.400' },
  transition: 'colors',
})

const IconLink = (props: ComponentPropsWithoutRef<'a'>) => {
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

const footerStackStyle = hstack({
  justify: 'space-between',
  p: '2',
  mb: '12',
})
const copyStyle = css({
  p: '4',
  fontSize: 'xs',
  fontWeight: 'light',
})

export const Footer = () => {
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
