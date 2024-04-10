import { Link } from '@remix-run/react'

import { css, cx } from 'styled-system/css'
import { divider } from 'styled-system/patterns'

import type { ToCEl } from '~/utils/useToC'

const tocStyle = css({
  gridArea: 'toc',
  hideBelow: 'xl',
  position: 'sticky',
  top: '12',
  mt: '2',
  mb: '12',
  px: '6',
  w: '56',
  maxHeight: '[calc(100dvh - 2 * token(sizes.12))]',
  fontSize: 'sm',
  overflowY: 'auto',
})
const tocHeadingStyle = css({
  fontWeight: 'semibold',
  mt: '6',
  mb: '2',
})
const tocLinkStyle = css({
  display: 'inline-block',
  py: '1',
})
const h2LinkStyle = css({
  fontWeight: 'medium',
})
const h3LinkStyle = css({
  ml: '4',
})
const dividerStyle = divider({
  color: 'neutral.700',
  w: '10',
  position: 'sticky',
  top: '0',
})

const ToCSub = ({ toc }: { toc: ToCEl[] }) => {
  return (
    <ol>
      {toc.map((heading) => (
        <li key={heading.id}>
          <Link
            to={`#${encodeURIComponent(heading.id)}`}
            className={cx(
              tocLinkStyle,
              heading.level === 2 ? h2LinkStyle : h3LinkStyle,
            )}
          >
            {heading.text}
          </Link>
          {heading.children.length > 0 && <ToCSub toc={heading.children} />}
        </li>
      ))}
    </ol>
  )
}

export const ToC = ({ toc }: { toc: ToCEl[] }) => {
  return (
    <aside className={tocStyle}>
      <div className={dividerStyle} />
      <nav>
        <h5 className={tocHeadingStyle}>CONTENTS</h5>
        <ToCSub toc={toc} />
      </nav>
    </aside>
  )
}
