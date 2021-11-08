export function getAllTagsData(posts: postData[]) {
  let tagsSet = new Set<string>()
  let tags: tagData[] = new Array()
  let articles: {
    [key: string]: postData[]
  } = {}

  function convertToArr(value: string) {
    let tagData: tagData = {
      name: value,
      articles: articles[value]
    }
    tags.push(tagData)
  }

  posts.forEach(post => {
    post.tags.map((tag) => {
      tagsSet.add(tag)
    })
    for (let i = 0; i < post.tags.length; i++) {
      let tagName = post.tags[i]
      if (!articles[tagName]) {
        articles[tagName] = []
      }
      articles[tagName].push(post)
    }
  })

  tagsSet.forEach(convertToArr)

  tags.sort((a, b) => b.articles.length - a.articles.length)

  return tags
}