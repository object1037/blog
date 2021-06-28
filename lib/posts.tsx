export function getAllPostsData() {
  let metas = new Array

  const contexts = require.context('../pages/posts/', false, /\.mdx$/)
  contexts.keys().map((path: string) => {
    metas.push(contexts(path).meta)
  })

  return metas.reverse()
}