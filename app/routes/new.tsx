import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import { Editor } from '../islands/editor'
import { requireAuth } from '../middlewares/requireAuth'
import { parseMarkdown } from '../services/markdoc'

export const POST = createRoute(requireAuth, async (c) => {
  const formData = await c.req.formData()
  const code = formData.get('code')
  const result = parseMarkdown(typeof code === 'string' ? code : '')
  if (!result.success) {
    const message =
      result.errors === 'Bad Frontmatter'
        ? 'Bad Frontmatter'
        : 'Markdoc validation error'
    throw new HTTPException(400, { message })
  }
  console.log(result.frontmatter)
  console.log(code)
  return c.text('Post created successfully', 201)
})

export default createRoute(requireAuth, (c) => {
  const session = c.get('session')

  return c.render(
    <>
      <h1>New post</h1>
      <p>{session?.userAgent}</p>
      <Editor />
    </>,
  )
})
