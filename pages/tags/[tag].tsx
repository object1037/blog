import { useRouter } from 'next/router'
import { siteTitle, handleName, siteUrl } from '../../components/articleLayout'
import Layout from '../../components/layout'
import { GetStaticProps } from 'next'
import { getAllTags } from '../../lib/getAllPostsTags'
import PostCard from '../../components/post-card'
import { FiHash } from 'react-icons/fi'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allTags = getAllTags()
  const tag = params?.tag as string
  const searchByTag = (element: tagData) => element.name === tag
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
  const hashTag = 
  <span className="inline-flex flex-row items-center leading-none">
    <FiHash className="inline-block w-16 h-16 p-3 mr-3 rounded-full bg-gray-100 dark:bg-gray-800"/>
    {tag}
  </span>

  if (router.isFallback) {
    return (
    <Layout h1={hashTag} title={`${tag}に関する投稿 | ${siteTitle}`} description={`${tag}に関する投稿一覧 | ${handleName}のブログ`} url={`${siteUrl}/tags/${tag}`}>
      <h2 className="text-center">Loading...</h2>
    </Layout>
    )
  }

  return (
    <Layout h1={hashTag} title={`${tag}に関する投稿 | ${siteTitle}`} description={`${tag}に関する投稿一覧 | ${handleName}のブログ`} url={`${siteUrl}/tags/${tag}`}>
      <ul className="flex flex-col justify-center max-w-3xl mx-auto w-full">
        {postsWithTag.map((meta) => (
          <PostCard key={meta.date} date={meta.date} title={meta.title} description={meta.description} tags={meta.tags} />
        ))}
      </ul>
    </Layout>
  )
}