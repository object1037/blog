import type { Frontmatter, Post } from '../types'

export const getPostCtxData = () => {
  console.log('Getting post context data...')

  const posts = import.meta.glob<Post>('../routes/posts/*.mdx', {
    eager: true,
  })
  const tagInfos: [name: string, posts: Frontmatter[]][] = []
  const postInfos = Object.values(posts).map((post) => post.frontmatter)

  postInfos.forEach((postInfo) => {
    postInfo.tags.forEach((tag) => {
      const existing = tagInfos.find(([name]) => name === tag)
      if (existing) {
        existing[1].push(postInfo)
      } else {
        tagInfos.push([tag, [postInfo]])
      }
    })
  })

  return { postInfos, tagInfos }
}
