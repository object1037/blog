import { getAllPostsPaths } from '../utils/getAllPostsPaths'
import getBundledMdx from '../lib/getBundledMdx'

export async function getAllPostsData() {
  const allPaths = getAllPostsPaths()
  const allData = allPaths.map((date) => {
    return getBundledMdx(date)
  })

  return Promise.all(allData).then((allData) => {
    const allMatter = allData.map((data) => {
      return data.frontmatter
    })
    allMatter.sort(function(a, b) {
      return +b.date - +a.date;
    })
    return allMatter
  })
}