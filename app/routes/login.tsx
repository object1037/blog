import { createRoute } from 'honox/factory'
import { LoginWidget } from '../islands/loginWidget'

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>Login</h1>
      <LoginWidget />
    </div>,
  )
})
