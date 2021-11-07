export function getAllTagsData(metas: metaData[]) {
  let tagsSet = new Set<string>()
  let tags: tagData[] = new Array()
  let articles: {
    [key: string]: metaData[]
  } = {}

  function convertToArr(value: string) {
    let tagData: tagData = {
      name: value,
      articles: articles[value]
    }
    tags.push(tagData)
  }

  metas.forEach(meta => {
    meta.tags.map((tag) => {
      tagsSet.add(tag)
    })
    for (let i = 0; i < meta.tags.length; i++) {
      let tagName = meta.tags[i]
      if (!articles[tagName]) {
        articles[tagName] = []
      }
      articles[tagName].push(meta)
    }
  })

  tagsSet.forEach(convertToArr)

  tags.sort((a, b) => b.articles.length - a.articles.length)

  return tags
}