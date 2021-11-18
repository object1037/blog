import { readdirSync } from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostsPaths() {
  const allPostsPaths = readdirSync(postsDirectory).map((fileName) => (
    fileName.replace(/\.mdx$/, '')
  ))

  return allPostsPaths
}