import { createRoute } from 'honox/factory'
import { css } from '../../styled-system/css'
import { Meta } from '../components/meta'
import { PostList } from '../components/postList'
import { SessionList } from '../components/sessionList'
import { requireAuth } from '../middlewares/requireAuth'
import { getAllPosts } from '../services/db'
import { getSessions } from '../services/session'

export default createRoute(requireAuth, async (c) => {
  const sessions = await getSessions(c)
  const posts = await getAllPosts(c.env.DB)
  const sessionId = c.get('sessionId')

  const h2Style = css({
    fontWeight: 'semibold',
    fontSize: 'xl',
    mt: '6',
    mb: '4',
  })

  return c.render(
    <>
      <Meta title="Dashboard" />
      <SessionList
        sessions={sessions.sort((a, b) => b.createdAt - a.createdAt)}
        currentSID={sessionId ?? ''}
      />
      <h2 class={h2Style}>Posts</h2>
      <PostList posts={posts} dash={true} />
    </>,
    { heading: 'Dashboard', isDashboard: true },
  )
})
