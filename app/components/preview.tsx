import { html, raw } from 'hono/html'
import { css } from '../../styled-system/css'
import { Highlight } from '../islands/highlight'
import { markdownToHtml } from '../services/markdown'

export const Preview = ({
  content,
  errors,
}: {
  content: string
  errors: string[]
}) => {
  const parsed = markdownToHtml(content)

  const container = css({
    h: '3xl',
    overflow: 'auto',
    borderWidth: '1px',
    borderColor: 'neutral.200',
    rounded: 'lg',
    p: '6',
  })

  return (
    <div class={container}>
      {errors.length > 0 ? (
        <ul class={css({ pl: '8', pt: '4', color: 'red.700' })}>
          {errors.map((error) => (
            <li key={error} class={css({ listStyleType: 'disc' })}>
              {error}
            </li>
          ))}
        </ul>
      ) : (
        <div class="markdown_wrapper">{html`${raw(parsed.html)}`}</div>
      )}
      {parsed.hasCodeBlock && <Highlight />}
    </div>
  )
}
