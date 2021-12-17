import algoliasearch from 'algoliasearch'

export default async function generateSearchIndex({
  plaintext,
  frontmatter
}: {
  plaintext: string
  frontmatter: postData
}) {
  const record = {
    objectID: frontmatter.date,
    title: frontmatter.title,
    description: frontmatter.description,
    content: plaintext
  }
  const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID!, process.env.ALGOLIA_ADMIN_API_KEY!)
  const index = client.initIndex('blog_datas')
  index.saveObject(record)
}