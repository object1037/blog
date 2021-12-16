import algoliasearch from 'algoliasearch'
import { getAllBundledMdx } from '../utils/getAllBundledMdx'

export default async function generateSearchIndex() {
  const allPosts = await getAllBundledMdx()
  const records = allPosts.map((post) => (
    {
      objectID: post.frontmatter.date,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      content: post.plainText
    }
  ))
  const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID!, process.env.ALGOLIA_ADMIN_API_KEY!)
  const index = client.initIndex('blog_datas')
  index.saveObjects(records)
}