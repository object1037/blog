import { Link } from '@remix-run/react'

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

export const ToC = ({ toc }: { toc: ToCEl[] }) => {
  return (
    <div>
      <ToCSub toc={toc} />
    </div>
  )
}
