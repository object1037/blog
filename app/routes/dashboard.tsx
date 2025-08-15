import { createRoute } from 'honox/factory'
import { requireAuth } from '../middlewares/requireAuth'

export default createRoute(requireAuth, (c) => {
  const session = c.get('session')
  return c.render(
    <>
      <p>{session?.userAgent}</p>
      <form action="/logout" method="post">
        <button type="submit">Logout</button>
      </form>
    </>,
    { heading: 'Dashboard' },
  )
})
