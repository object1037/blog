import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { getAllPostsData } from '../utils/getAllPostsData'
import generateRSS from '../utils/generateRSS'
import PostCard from '../components/post-card'

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPostsData()

  // ついでにRSS生成
  generateRSS(allPosts)

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