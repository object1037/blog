import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import Head from 'next/head'
import { siteTitle, siteUrl } from '../../components/articleLayout'

export default function TagPage() {
  const router = useRouter()
  const { tag } = router.query

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
      
    </Layout>
  )
}