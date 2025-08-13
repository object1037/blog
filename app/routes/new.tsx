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
    console.log(result.errors)
    throw new HTTPException(400, { message: 'Markdoc validation error' })
  }
  console.log(result.frontmatter)
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
