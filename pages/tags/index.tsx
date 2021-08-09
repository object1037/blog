import { siteTitle, handleName, siteUrl} from '../../components/articleLayout'
import { tagData } from '../../lib/getAllPostsTags'
import Layout from '../../components/layout'
import Tag from '../../components/tag'
import { GetStaticProps } from 'next'
import { getAllTags } from '../../lib/getAllPostsTags'

export const getStaticProps: GetStaticProps = async () => {
  const allTags = getAllTags()
  return {
    props: {
      allTags
    }
  }
}

export default function Home({
  allTags
}: {
  allTags: tagData[]
}) {
  return (
    <>
    <Layout title={`タグ一覧 | ${siteTitle}`} description={`タグ一覧 | ${handleName}のブログ`} url={`${siteUrl}/tags`}>
      <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">タグ一覧</h1>
      <div className="mx-6 flex flex-row flex-wrap justify-center">
        {allTags.map((tag) => (
          <Tag name={tag.name} postsCount={tag.articles.length} key={tag.name}/>
        ))}
      </div>
    </Layout>
    </>
  )
}