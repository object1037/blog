import { getAllPostsPaths } from '../utils/getAllPostsPaths'
import getBundledMdx from '../lib/getBundledMdx'

export async function getAllBundledMdx() {
  const allPaths = getAllPostsPaths().filter(path => path != "testPost")
  
  const allData = allPaths.map((date) => {
    return getBundledMdx(date)
  })

  return Promise.all(allData).then((allData) => {
    return allData
  })
}