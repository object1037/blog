import { createRoute } from 'honox/factory'
import { Meta } from '../components/meta'
import { SessionList } from '../components/sessionList'
import { requireAuth } from '../middlewares/requireAuth'
import { getSessions } from '../services/session'

export default createRoute(requireAuth, async (c) => {
  const sessions = await getSessions(c)
  const sessionId = c.get('sessionId')

  return c.render(
    <>
      <Meta title="Dashboard" />
      <SessionList
        sessions={sessions.sort((a, b) => b.createdAt - a.createdAt)}
        currentSID={sessionId ?? ''}
      />
    </>,
    { heading: 'Dashboard', isDashboard: true },
  )
})
