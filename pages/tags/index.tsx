import { siteTitle, handleName, siteUrl } from '../../constants/data'
import Layout from '../../components/layout'
import Tag from '../../components/tag'
import { GetStaticProps } from 'next'
import { getAllTagsData } from '../../utils/getAllTagsData'
import { getAllPostsData } from '../../utils/getAllPostsData'
import generateSitemap from '../../utils/generateSitemap'

export const getStaticProps: GetStaticProps = async () => {
  const allTags = getAllTagsData(getAllPostsData())
  
  const tags = allTags.map((tagData) => {
    return tagData.name
  })

  // ついでにSitemap生成
  generateSitemap(tags)

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
    <Layout h1="Tags" title={`タグ一覧 | ${siteTitle}`} description={`タグ一覧 | ${handleName}のブログ`} url={`${siteUrl}/tags`}>
      <div className="-ml-4 -mt-2 flex flex-row flex-wrap w-full">
        {allTags.map((tag) => (
          <Tag name={tag.name} postsCount={tag.articles.length} key={tag.name}/>
        ))}
      </div>
    </Layout>
    </>
  )
}