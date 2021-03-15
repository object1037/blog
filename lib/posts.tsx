import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'pages/posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const idN = +id

    return {
      idN,
      ...(matterResult.data as {title: string, description: string})
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.idN < b.idN) {
      return 1
    } else {
      return -1
    }
  })
}