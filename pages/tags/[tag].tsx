import { useRouter } from 'next/router'
import { siteTitle, handleName, siteUrl } from '../../constants/data'
import Layout from '../../components/layout'
import { GetStaticProps } from 'next'
import { getAllTags } from '../../utils/getAllPostsTags'
import PostCard from '../../components/post-card'
import { FiHash } from 'react-icons/fi'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allTags = getAllTags()
  const searchByTag = (element: tagData) => element.name === params?.tag
  const postsWithTag = allTags[allTags.findIndex(searchByTag)].articles
  return {
    props: {
      postsWithTag
    }
  }
}

export async function getStaticPaths() {
  const allTags = getAllTags()
  return {
    paths: allTags.map((tagData) => ({ params: { tag: tagData.name } })),
    fallback: false
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
  <p className="inline-flex flex-row items-center leading-none">
    <span className="w-16 h-16 flex justify-center content-center items-center p-3 mr-3 rounded-full bg-gray-100 dark:bg-gray-800">
      <FiHash className="inline-block"/>
    </span>
    {tag}
  </p>

  return (
    <Layout h1={hashTag} title={`${tag}に関する投稿 | ${siteTitle}`} description={`${tag}に関する投稿一覧 | ${handleName}のブログ`} url={`${siteUrl}/tags/${tag}`}>
      <ul className="flex flex-col justify-center max-w-4xl mx-auto w-full">
        {postsWithTag.map((meta) => (
          <PostCard key={meta.date} date={meta.date} title={meta.title} description={meta.description} tags={meta.tags} />
        ))}
      </ul>
    </Layout>
  )
}