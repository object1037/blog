import { createRoute } from 'honox/factory'
import { Meta } from '../components/meta'
import { LoginWidget } from '../islands/loginWidget'
import { requireAuth } from '../middlewares/requireAuth'

export default createRoute(requireAuth, (c) => {
  const sessionId = c.get('sessionId')
  if (sessionId) {
    return c.redirect('/dashboard')
  }

  return c.render(
    <>
      <Meta title="Login" />
      <div>
        <LoginWidget />
      </div>
    </>,
    { heading: 'Login', isDashboard: true },
  )
})
