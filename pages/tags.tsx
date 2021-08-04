import { siteTitle, siteUrl } from '../components/articleLayout'
import { tagData } from '../lib/getAllPostsTags'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { getAllTags } from '../lib/getAllPostsTags'
import { useEffect } from 'react'

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
  useEffect(() => {
    console.log(allTags)
  })
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
          <div className="m-2" key={tag.name}>
            <Link href={`/tags/${tag.name}`}>
              <a className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md">
                # {tag.name}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
    </>
  )
}