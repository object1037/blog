import type { ReactElement } from 'react'
import { siteTitle, handleName, siteUrl } from '../../constants/data'
import Layout from '../../components/layout'
import PageLayout from '../../components/pageLayout'
import Tag from '../../components/tag'
import { GetStaticProps } from 'next'
import { getAllTagsData } from '../../utils/getAllTagsData'
import { getAllPostsData } from '../../utils/getAllPostsData'
import generateSitemap from '../../utils/generateSitemap'

export const getStaticProps: GetStaticProps = async () => {
  const allTags = getAllTagsData(await getAllPostsData())
  
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

export default function Page({
  allTags
}: {
  allTags: tagData[]
}) {
  return (
    <div className="-ml-4 -mt-2 flex flex-row flex-wrap w-full">
      {allTags.map((tag) => (
        <Tag name={tag.name} postsCount={tag.articles.length} key={tag.name}/>
      ))}
    </div>
  )
}

Page.getLayout = function getLayout({ page }: { page: ReactElement }) {
  return (
    <Layout title={`タグ一覧 | ${siteTitle}`} description={`タグ一覧 | ${handleName}のブログ`} url={`${siteUrl}/tags`}>
      <PageLayout h1="Tags">
        {page}
      </PageLayout>
    </Layout>
  )
}