import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div class="py-8 text-center">
      <title>Blog Tags</title>
      <h1 class="text-3xl font-bold">Tags</h1>
    </div>,
  )
})
