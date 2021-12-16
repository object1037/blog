import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { getAllPostsData } from '../utils/getAllPostsData'
import generateRSS from '../utils/generateRSS'
import PostCard from '../components/post-card'
import generateSearchIndex from '../lib/generateSearchIndex'

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPostsData()

  // ついでにRSSと検索インデックス(本番時のみ)生成
  generateRSS(allPosts)
  if (process.env.NODE_ENV === 'production') {
    generateSearchIndex()
  }

  return {
    props: {
      allPosts
    }
  }
}

export default function Home({
  allPosts
}: {
  allPosts: postData[]
}) {
  return (
    <>
    <Layout h1="Posts">
      <ul className="flex flex-col justify-center max-w-4xl w-full">
        {allPosts.map((post) => (
          <PostCard key={post.date} date={post.date} title={post.title} description={post.description} tags={post.tags} />
        ))}
      </ul>
    </Layout>
    </>
  )
}