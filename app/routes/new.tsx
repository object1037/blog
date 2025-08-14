import { vValidator } from '@hono/valibot-validator'
import type { ValidateError } from '@markdoc/markdoc'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { Editor } from '../islands/editor'
import { requireAuth } from '../middlewares/requireAuth'
import { parseMarkdown } from '../services/markdoc'

const Page = ({
  content,
  errors,
}: {
  content: string
  errors: ValidateError[]
}) => {
  return (
    <>
      <h1>New post</h1>
      <Editor initialValue={content} />
      {errors.length > 0 && (
        <ul>
          {errors.map(({ error }) => (
            <li key={error.message}>
              [{error.id}]: {error.message}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default createRoute(requireAuth, (c) => {
  return c.render(<Page content="" errors={[]} />)
})

export const POST = createRoute(
  requireAuth,
  vValidator('form', v.object({ content: v.string() })),
  async (c) => {
    const { content } = c.req.valid('form')
    const result = parseMarkdown(typeof content === 'string' ? content : '')
    if (!result.success) {
      console.log(result.errors)
      return c.render(<Page content={content} errors={result.errors} />)
    }
    console.log(result.frontmatter)
    console.log(content)
    return c.redirect('/dashboard', 303)
  },
)
