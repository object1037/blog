import { createRoute } from 'honox/factory'
import { requireAuth } from '../middlewares/requireAuth'
import { getSessions } from '../services/session'

export default createRoute(requireAuth, async (c) => {
  const sessions = await getSessions(c)

  return c.render(
    <>
      <h2>Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <p>{session.id}</p>
            <p>{session.userAgent}</p>
          </li>
        ))}
      </ul>
      <form action="/logout" method="post">
        <button type="submit">Logout</button>
      </form>
    </>,
    { heading: 'Dashboard', isDashboard: true },
  )
})
