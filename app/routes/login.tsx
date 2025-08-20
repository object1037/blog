import { createRoute } from 'honox/factory'
import { Meta } from '../components/meta'
import { LoginWidget } from '../islands/loginWidget'
import { requireAuth } from '../middlewares/requireAuth'

export default createRoute(requireAuth, (c) => {
  const nextPath = c.req.query('nextPath')
  const sessionId = c.get('sessionId')
  if (sessionId) {
    return c.redirect(nextPath ? nextPath : '/dashboard')
  }

  return c.render(
    <>
      <Meta title="Login" />
      <div>
        <LoginWidget nextPath={nextPath} />
      </div>
    </>,
    { heading: 'Login', isDashboard: true },
  )
})
