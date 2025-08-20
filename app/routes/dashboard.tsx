import { createRoute } from 'honox/factory'
import { Plus } from 'lucide'
import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'
import { LucideIcon } from '../components/lucideIcon'
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

  const postsFlexStyle = flex({
    justify: 'space-between',
    alignItems: 'center',
    mt: '2',
  })
  const h2Style = css({
    fontWeight: 'semibold',
    fontSize: 'xl',
    my: '4',
  })
  const newBStyle = css({
    display: 'block',
    borderColor: 'neutral.900',
    borderWidth: '1px',
    bg: { base: 'neutral.900', _hover: 'neutral.50' },
    color: { base: 'neutral.50', _hover: 'neutral.900' },
    transition: 'colors',
    rounded: 'lg',
    p: '2',
    h: 'min',
    fontSize: 'xl',
  })

  return c.render(
    <>
      <Meta title="Dashboard" />
      <SessionList
        sessions={sessions.sort((a, b) => b.createdAt - a.createdAt)}
        currentSID={sessionId ?? ''}
      />
      <div class={postsFlexStyle}>
        <h2 class={h2Style}>Posts</h2>
        <a href="/new" class={newBStyle}>
          <LucideIcon icon={Plus} title="New Post" />
        </a>
      </div>
      <PostList posts={posts} dash={true} />
    </>,
    { heading: 'Dashboard', isDashboard: true },
  )
})
