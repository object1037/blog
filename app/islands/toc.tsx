import { css, cx } from 'hono/css'
import { useEffect, useState } from 'hono/jsx'
import { getToC, type ToCEl } from '../lib/getToC.client'

export const ToCSub = ({
  toc,
  setOpen,
}: {
  toc: ToCEl[]
  setOpen?: ((open: boolean) => void) | undefined
}) => {
  const tocLinkStyle = css`
    display: inline-block;
    padding: 0.25rem 0;
    color: #404040;
    width: 100%;
    padding-right: 1.5rem;
    border-left: 1px solid #d4d4d4;
    &:target-before {
      border-left: 1px solid #d4d4d4;
    }
    &:target-current {
      border-left: 1px solid #a3a3a3;
      background-color: #f5f5f5;
    }
    &:target-after {
      border-left: 1px solid #e5e5e5;
    }
  `
  const h2LinkStyle = css`
    font-weight: 500;
    padding-left: 1.5rem;
  `
  const h3LinkStyle = css`
    padding-left: 2.5rem;
  `

  return (
    <ol>
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${encodeURIComponent(heading.id)}`}
            class={cx(
              tocLinkStyle,
              heading.level === 2 ? h2LinkStyle : h3LinkStyle,
            )}
            onClick={() => setOpen?.(false)}
          >
            {heading.text}
          </a>
          {heading.children.length > 0 && (
            <ToCSub toc={heading.children} setOpen={setOpen} />
          )}
        </li>
      ))}
    </ol>
  )
}

export const ToC = () => {
  const [toc, setToC] = useState<ToCEl[]>([])

  useEffect(() => {
    setToC(getToC())
  }, [])

  const tocHeadingStyle = css`
    position: sticky;
    top: 0;
    padding: 1rem 1.5rem 0.5rem 1.5rem;
    background-color: #fafafa;
    font-weight: 600;
    border-left: 1px solid #d4d4d4;
  `
  const navStyle = css`
    padding-bottom: 0.5rem;
    scroll-target-group: auto;
  `

  return (
    <nav class={navStyle}>
      <h5 className={tocHeadingStyle}>CONTENTS</h5>
      <ToCSub toc={toc} />
    </nav>
  )
}
