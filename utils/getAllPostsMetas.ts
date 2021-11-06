import generateRSS from './generateRSS'
import generateSitemap from './generateSitemap'

export function getAllPostsData() {
  let metas: metaData[] = new Array()

  const contexts = require.context('../pages/posts/', false, /\.mdx$/)
  contexts.keys().map((path: string) => {
    metas.push(contexts(path).meta)
  })

  metas = metas.reverse()

  // ついでにRSSとSitemap生成
  generateRSS(metas)
  generateSitemap()

  return metas
}