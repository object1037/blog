import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div>
      <title>ゆるふわインターネット</title>
      <h1>Posts</h1>
    </div>,
  )
})
