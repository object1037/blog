import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'

import { type ToCEl } from '~/utils/useToC'

const ToCSub = ({ toc }: { toc: ToCEl[] }) => {
  return (
    <ol>
      {toc.map((heading) => (
        <li key={heading.id}>
          <Link to={`#${heading.id}`}>{heading.text}</Link>
          {heading.children.length > 0 && <ToCSub toc={heading.children} />}
        </li>
      ))}
    </ol>
  )
}

const tocStyle = css({
  gridArea: 'toc',
  hideBelow: 'xl',
  position: 'stiky',
  top: '24',
  w: '56',
})

export const ToC = ({ toc }: { toc: ToCEl[] }) => {
  return (
    <nav className={tocStyle}>
      <ToCSub toc={toc} />
    </nav>
  )
}
