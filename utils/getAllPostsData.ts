import { getAllBundledMdx } from './getAllBundledMdx'

export async function getAllPostsData() {
  const allData = await getAllBundledMdx()

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