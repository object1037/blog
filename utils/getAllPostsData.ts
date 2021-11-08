export function getAllPostsData() {
  let posts: postData[] = new Array()

  const contexts = require.context('../pages/posts/', false, /\.mdx$/)
  contexts.keys().map((path: string) => {
    posts.push(contexts(path).meta)
  })

  posts = posts.reverse()

  return posts
}