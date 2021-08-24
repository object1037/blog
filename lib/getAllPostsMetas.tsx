export function getAllPostsData() {
  let metas: metaData[] = new Array()

  const contexts = require.context('../pages/posts/', false, /\.mdx$/)
  contexts.keys().map((path: string) => {
    metas.push(contexts(path).meta)
  })

  return metas.reverse()
}