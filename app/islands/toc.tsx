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
  `
  const h2LinkStyle = css`
    font-weight: 500;
  `
  const h3LinkStyle = css`
    margin-left: 1rem;
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
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    background-color: #fafafa;
    font-weight: 600;
  `

  return (
    <nav class={css`padding-bottom: 0.5rem;`}>
      <h5 className={tocHeadingStyle}>CONTENTS</h5>
      <ToCSub toc={toc} />
    </nav>
  )
}
