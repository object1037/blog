import { bundleMDX } from "mdx-bundler"
import path from 'path'
import rehypeHighlight from 'rehype-highlight'
import remarkMath from 'remark-math'
import rehypeKatex from "rehype-katex"
import { readFileSync } from 'fs'
import removeMd from 'remove-markdown'

const remarkPlugins = [
  remarkMath,
]
const rehypePlugins = [
  rehypeHighlight,
  rehypeKatex,
]

export default async function getBundledMdx(date: string) {
  const filePath = path.join(process.cwd(), `posts/${date}.mdx`)
  const regex = /---\n[^]*?\n---/
  const markdown = readFileSync(filePath).toString().replace(regex, '').trim()
  const plaintext = removeMd(markdown)

  const result = await bundleMDX<postData>({
    file: filePath,
    cwd: path.join(process.cwd(), "posts"),
    xdmOptions: options => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins
      ]
  
      return options
    },
  })
  const {code, frontmatter} = result
  return {code, frontmatter, plaintext}
}