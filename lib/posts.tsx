import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'pages/posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    const id = +fileName.replace(/\.mdx$/, '')

    return {
      id
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.id < b.id) {
      return 1
    } else {
      return -1
    }
  })
}