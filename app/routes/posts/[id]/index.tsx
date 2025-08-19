import { vValidator } from '@hono/valibot-validator'
import { html, raw } from 'hono/html'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { css } from '../../../../styled-system/css'
import { Meta } from '../../../components/meta'
import { TagList } from '../../../components/tagList'
import { Highlight } from '../../../islands/highlight'
import { ToC } from '../../../islands/toc'
import { ToCMobile } from '../../../islands/tocMobile'
import { getPostByID } from '../../../services/db'
import { markdownToHtml } from '../../../services/markdown'

export default createRoute(
  vValidator(
    'param',
    v.object({
      id: v.pipe(v.string(), v.transform(Number), v.number()),
    }),
  ),
  async (c) => {
    const { id } = c.req.valid('param')
    const post = await getPostByID(c.env.DB, id)
    if (!post) {
      return c.notFound()
    }

    const parsed = markdownToHtml(post.content)

    const tocStyle = css({
      hideBelow: 'xl',
      position: 'fixed',
      px: '6',
      fontSize: 'sm',
      overflowY: 'auto',
      borderLeftWidth: '1px',
      borderColor: 'neutral.200',
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

    return c.render(
      <>
        <Meta
          title={post.title}
          description={post.description}
          url={c.req.url}
          type="article"
        />
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
