export function getAllTags() {
  let tagsSet = new Set()
  let tags = new Array()

  const contexts = require.context('../pages/posts/', false, /\.mdx$/)
  contexts.keys().map((path: string) => {
    contexts(path).meta.tags.map((tag: string) => {
      tagsSet.add(tag)
    })
  })

  tagsSet.forEach(convertToArr)

  function convertToArr(value: string) {
    tags.push(value)
  }

  return tags
}