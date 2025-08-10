import type { MDXContent } from 'mdx/types'

export type Frontmatter = {
  id: string
  title: string
  description: string
  tags: string[]
}

export type Post = {
  frontmatter: Frontmatter
  default: MDXContent
}
