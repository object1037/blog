import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  const tag = c.req.param('tag')
  return c.render(
    <div class="py-8 text-center">
      <title>{tag}</title>
      <h1 class="text-3xl font-bold">Tag: {tag}</h1>
    </div>,
  )
})
