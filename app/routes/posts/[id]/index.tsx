import { vValidator } from '@hono/valibot-validator'
import { cache } from 'hono/cache'
import { html, raw } from 'hono/html'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { css } from '../../../../styled-system/css'
import { hstack } from '../../../../styled-system/patterns'
import { Meta } from '../../../components/meta'
import { TagList } from '../../../components/tagList'
import { Highlight } from '../../../islands/highlight'
import { ToC } from '../../../islands/toc'
import { ToCMobile } from '../../../islands/tocMobile'
import { getDatetime } from '../../../lib/getDatetime'
import { requireAuth } from '../../../middlewares/requireAuth'
import { deletePost, getPostByID } from '../../../services/db'
import { markdownToHtml } from '../../../services/markdown'

const paramSchema = v.object({
  id: v.pipe(v.string(), v.transform(Number), v.number()),
})

export default createRoute(
  vValidator('param', paramSchema),
  cache({
    cacheName: 'post-cache',
    cacheControl: 'public, max-age=600, s-max-age=86400',
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const post = await getPostByID(c.env.DB, id)
    if (!post) {
      return c.notFound()
    }

    const parsed = markdownToHtml(post.content)

    const timeStyle = hstack({
      fontSize: 'sm',
      color: 'neutral.700',
      mb: '4',
    })
    const tocStyle = css({
      hideBelow: 'xl',
      position: 'fixed',
      fontSize: 'sm',
      overflowY: 'auto',
      width: '56',
      maxHeight: '[calc(100dvh - token(sizes.80))]',
      left: '[calc(50% + token(sizes.3xl) / 2 + token(spacing.4))]',
      top: '40',
      mb: '40',
    })
    const tocMobileStyle = css({
      hideFrom: 'xl',
      position: 'fixed',
      right: '[max(2rem, calc((100dvw - token(sizes.3xl)) / 2))]',
      bottom: '20',
      fontSize: 'sm',
    })

    const dateTime = getDatetime(post.id)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const diffMs = today.getTime() - new Date(dateTime).getTime()
    const diffYears = Math.round(diffMs / (1000 * 60 * 60 * 24 * 365))

    return c.render(
      <>
        <Meta
          title={post.title}
          description={post.description}
          url={c.req.url}
          type="article"
        />
        <div class={timeStyle}>
          <time dateTime={dateTime}>{dateTime}</time>
          {diffYears >= 1 && (
            <span class={css({ fontSize: 'xs', fontWeight: 'light' })}>
              ({diffYears} year{diffYears > 1 ? 's' : ''} ago)
            </span>
          )}
        </div>
        <TagList tags={post.tags.map((tag) => ({ name: tag, count: 0 }))} />
        <div class="markdown_wrapper">{html`${raw(parsed.html)}`}</div>
        <aside class={tocStyle}>
          <ToC />
        </aside>
        <aside class={tocMobileStyle}>
          <ToCMobile />
        </aside>
        {parsed.hasCodeBlock && <Highlight />}
      </>,
      { heading: post.title },
    )
  },
)

export const DELETE = createRoute(
  requireAuth,
  vValidator('param', paramSchema),
  async (c) => {
    const { id } = c.req.valid('param')
    await deletePost(c.env.DB, id)
    return
  },
)
