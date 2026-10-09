import { createRoute } from 'honox/factory'
import { Meta } from '../components/meta'
import { LoginWidget } from '../islands/loginWidget'
import { resolveSafeNextPath } from '../lib/safeRedirect'
import { requireAuth } from '../middlewares/requireAuth'

export default createRoute(requireAuth, (c) => {
  const nextPath = c.req.query('nextPath')
  const safeNextPath = resolveSafeNextPath(nextPath)
  const sessionId = c.get('sessionId')
  if (sessionId) {
    return c.redirect(safeNextPath)
  }

  return c.render(
    <>
      <Meta title="Login" />
      <div>
        <LoginWidget nextPath={safeNextPath} />
      </div>
    </>,
    { heading: 'Login', isDashboard: true },
  )
})
