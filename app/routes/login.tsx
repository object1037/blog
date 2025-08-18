import { createRoute } from 'honox/factory'
import { Meta } from '../components/meta'
import { LoginWidget } from '../islands/loginWidget'
import { requireAuth } from '../middlewares/requireAuth'

export default createRoute(requireAuth, (c) => {
  const session = c.get('session')
  if (session) {
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
