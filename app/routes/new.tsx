import { createRoute } from 'honox/factory'
import { Editor } from '../islands/editor'
import { requireAuth } from '../middlewares/requireAuth'

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
