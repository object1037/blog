import { siteTitle, siteUrl } from '../components/articleLayout'
import { tagData } from '../lib/getAllPostsTags'
import Head from 'next/head'
import Layout from '../components/layout'
import Tag from '../components/tag'
import { GetStaticProps } from 'next'
import { getAllTags } from '../lib/getAllPostsTags'

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
    <Layout>
      <Head>
        <meta name="description" content="タグ一覧" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@object1037" />
        <meta property="og:url" content={`${siteUrl}/tags`} />
        <meta property="og:title" content="タグ一覧" />
        <meta property="og:description" content="タグ一覧" />
        <title>タグ一覧 | {siteTitle}</title>
      </Head>
      <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">タグ一覧</h1>
      <div className="mx-6 flex flex-row flex-wrap justify-center">
        {allTags.map((tag) => (
          <Tag name={tag.name} key={tag.name}/>
        ))}
      </div>
    </Layout>
    </>
  )
}