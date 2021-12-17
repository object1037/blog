import { getAllPostsPaths } from '../utils/getAllPostsPaths'
import getBundledMdx from '../lib/getBundledMdx'

export async function getAllPostsData() {
  const allPaths = getAllPostsPaths().filter(path => path != "testPost")
  
  const allData = allPaths.map((date) => {
    return getBundledMdx(date)
  })

  return Promise.all(allData).then((allData) => {
    const allDataWithoutDraft = allData.filter(data => !data.frontmatter.draft)
    const allMatter = allDataWithoutDraft.map((data) => {
      return data.frontmatter
    })
    allMatter.sort(function(a, b) {
      return +b.date - +a.date;
    })
    return allMatter
  })
}