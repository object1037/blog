import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  const id = c.req.param('id')

  return c.render(
    <div>
      <h1>Post {id}</h1>
    </div>,
  )
})
