import { css } from 'styled-system/css'

import type { getPostData } from '~/.server/db'
import { useToC } from '~/utils/useToC'
import { ContainerWithHeading } from './containerWithHeading'
import { TagList } from './tagList'
import { ToC } from './toc'

export const Article = ({
  post,
}: {
  post: NonNullable<Awaited<ReturnType<typeof getPostData>>>
}) => {
  const toc = useToC()

  const wrapperStyle = css({
    display: 'grid',
    gridTemplateAreas: '". article toc"',
    gridTemplateColumns: '[1fr minmax(0, {sizes.3xl}) 1fr]',
    alignItems: 'start',
  })

  return (
    <div className={wrapperStyle}>
      <ContainerWithHeading
        heading={post.title}
        className={css({ gridArea: 'article' })}
      >
        <TagList
          tagDatas={post.tags.map((tag) => ({ tagName: tag, count: 0 }))}
        />
        <article
          className="markdown_wrapper"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: the content is trusted.
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </ContainerWithHeading>
      <ToC toc={toc} />
    </div>
  )
}
