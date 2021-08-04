import { useRouter } from 'next/router'
import { tagData } from '../../lib/getAllPostsTags'
import Layout from '../../components/layout'
import Head from 'next/head'
import { siteTitle, siteUrl } from '../../components/articleLayout'
import { GetStaticProps } from 'next'
import { getAllTags } from '../../lib/getAllPostsTags'
import PostCard from '../../components/post-card'

export const getStaticProps: GetStaticProps = async () => {
  const allTags = getAllTags()
  return {
    props: {
      allTags
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { tag: "test1" } },
    ],
    fallback: true
  };
}

export default function TagPage({
  allTags
}: {
  allTags: tagData[]
}) {
  const router = useRouter()
  const { tag } = router.query

  const searchByTag = (element: tagData) => element.name === tag

  return (
    <Layout>
      <Head>
        <meta name="description" content={`「${tag}」に関する記事一覧`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@object1037" />
        <meta property="og:url" content={`${siteUrl}/tags/${tag}`} />
        <meta property="og:title" content={`「${tag}」に関する記事一覧`} />
        <meta property="og:description" content={`「${tag}」に関する記事一覧`} />
        <title>「{tag}」に関する記事一覧 | {siteTitle}</title>
      </Head>
      <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">「 {tag} 」に関する記事一覧</h1>
      <ul className="flex flex-col justify-center px-10 max-w-3xl mx-auto w-full">
        {allTags[allTags.findIndex(searchByTag)].articles.map((meta) => (
          <PostCard key={meta.date} date={meta.date} title={meta.title} description={meta.description} />
        ))}
      </ul>
    </Layout>
  )
}