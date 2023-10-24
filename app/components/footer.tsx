import { LuGithub, LuTwitter } from 'react-icons/lu'
import { css } from 'styled-system/css'
import { container, hstack } from 'styled-system/patterns'

const IconLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={css({
        p: '4',
        fontSize: '3xl',
        _hover: { color: 'neutral.400' },
        transition: 'colors',
      })}
    >
      {children}
    </a>
  )
}

export const Footer = () => {
  return (
    <footer className={container({ w: '100%' })}>
      <div
        className={hstack({
          justify: 'space-between',
          p: '2',
          mb: '12',
        })}
      >
        <div className={hstack()}>
          <IconLink href="https://twitter.com/object1037">
            <LuTwitter />
          </IconLink>
          <IconLink href="https://github.com/object1037">
            <LuGithub />
          </IconLink>
        </div>
        <p
          className={css({
            p: '4',
            fontSize: 'xs',
            fontWeight: 'light',
          })}
        >
          &copy; object1037
        </p>
      </div>
    </footer>
  )
}
