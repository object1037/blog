import { useRouter } from 'next/router'
import { tagData } from '../../lib/getAllPostsTags'
import { metaData } from '../../components/articleLayout'
import Layout from '../../components/layout'
import Head from 'next/head'
import { siteTitle, siteUrl } from '../../components/articleLayout'
import { GetStaticProps } from 'next'
import { getAllTags } from '../../lib/getAllPostsTags'
import PostCard from '../../components/post-card'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allTags = getAllTags()
  const searchByTag = (element: tagData) => element.name === params.tag
  if (allTags.findIndex(searchByTag) === -1) {
    return {
      notFound: true,
    }
  }
  const postsWithTag = allTags[allTags.findIndex(searchByTag)].articles
  return {
    props: {
      postsWithTag
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export default function TagPage({
  postsWithTag
}: {
  postsWithTag: metaData[]
}) {
  const router = useRouter()
  const { tag } = router.query

  if (router.isFallback) {
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
      <h2 className="text-center">Loading...</h2>
    </Layout>
    )
  }

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
        {postsWithTag.map((meta) => (
          <PostCard key={meta.date} date={meta.date} title={meta.title} description={meta.description} tags={meta.tags} />
        ))}
      </ul>
    </Layout>
  )
}