import { createRoute } from 'honox/factory'
import { LoginWidget } from '../islands/loginWidget'
import { requireAuth } from '../middlewares/requireAuth'

export default createRoute(requireAuth, (c) => {
  const session = c.get('session')
  if (session) {
    return c.redirect('/dashboard')
  }

  return c.render(
    <div>
      <h1>Login</h1>
      <LoginWidget />
    </div>,
  )
})
