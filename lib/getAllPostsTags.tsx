export interface tagData {
  name: string,
  articleIds: string[] 
}

export function getAllTags() {

  let tagsSet = new Set()
  let tags: tagData[] = new Array()
  let metas = new Array()
  let articles = {}

  const contexts = require.context('../pages/posts/', false, /\.mdx$/)

  contexts.keys().map((path: string) => {
    contexts(path).meta.tags.map((tag: string) => {
      tagsSet.add(tag)
    })
  })

  contexts.keys().map((path: string) => {
    metas.push(contexts(path).meta)
  })

  metas.forEach(meta => {
    for (let i = 0; i < meta.tags.length; i++) {
      let tagName = meta.tags[i]
      if (!articles[tagName]) {
        articles[tagName] = []
      }
      articles[tagName].push(meta.date)
    }
  })

  tagsSet.forEach(convertToArr)

  function convertToArr(value: string) {
    let tagD: tagData = {
      name: value,
      articleIds: articles[value]
    }
    tags.push(tagD)
  }

  return tags
}