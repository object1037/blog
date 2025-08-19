import { css, cx } from 'hono/css'
import { useEffect, useState } from 'hono/jsx'

export type ToCEl = {
  level: number
  text: string
  id: string
  children: ToCEl[]
}

const ToCSub = ({ toc }: { toc: ToCEl[] }) => {
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
          >
            {heading.text}
          </a>
          {heading.children.length > 0 && <ToCSub toc={heading.children} />}
        </li>
      ))}
    </ol>
  )
}

export const ToC = () => {
  const [toc, setToc] = useState<ToCEl[]>([])

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2,h3'))
    const headingsToC: ToCEl[] = headings.map((heading) => ({
      level: Number.parseInt(heading.tagName.slice(1), 10),
      text:
        (heading instanceof HTMLElement
          ? heading.innerText
          : heading.textContent) ?? '',
      id: heading.id,
      children: [],
    }))

    setToc(
      headingsToC.reduce((acc: ToCEl[], heading: ToCEl) => {
        let parent = acc

        while (parent.length > 0) {
          const last = parent.slice(-1)[0]
          if (!last || last.level >= heading.level) {
            break
          }
          parent = last.children
        }

        parent.push(heading)
        return acc
      }, []),
    )
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
