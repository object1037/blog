import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div>
      <title>Blog Tags</title>
      <h1>Tags</h1>
    </div>,
  )
})
