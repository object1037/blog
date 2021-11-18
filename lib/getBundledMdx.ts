import { bundleMDX } from "mdx-bundler"
import path from 'path'

//const remarkPlugins = []
//const rehypePlugins = []

export default async function getBundledMdx(date: string) {
  const result = await bundleMDX<postData>({
    file: path.join(process.cwd(), `posts/${date}.mdx`),
    cwd: path.join(process.cwd(), "posts"),
    xdmOptions: options => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        //...remarkPlugins
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        //...rehypePlugins
      ]
  
      return options
    },
  })
  const {code, frontmatter} = result
  return {code, frontmatter}
}