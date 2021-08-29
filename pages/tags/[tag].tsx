import { useRouter } from 'next/router'
import { siteTitle, handleName, siteUrl } from '../../components/articleLayout'
import Layout from '../../components/layout'
import { GetStaticProps } from 'next'
import { getAllTags } from '../../lib/getAllPostsTags'
import PostCard from '../../components/post-card'

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

  if (router.isFallback) {
    return (
    <Layout h1={`#${tag}`} title={`#${tag} | ${siteTitle}`} description={`#${tag} | ${handleName}のブログ`} url={`${siteUrl}/tags/${tag}`}>
      <h2 className="text-center">Loading...</h2>
    </Layout>
    )
  }

  return (
    <Layout h1={`#${tag}`} title={`#${tag} | ${siteTitle}`} description={`#${tag} | ${handleName}のブログ`} url={`${siteUrl}/tags/${tag}`}>
      <ul className="flex flex-col justify-center max-w-3xl mx-auto w-full">
        {postsWithTag.map((meta) => (
          <PostCard key={meta.date} date={meta.date} title={meta.title} description={meta.description} tags={meta.tags} />
        ))}
      </ul>
    </Layout>
  )
}