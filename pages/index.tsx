import type { ReactElement } from 'react'
import Layout from '../components/layout'
import PageLayout from '../components/pageLayout'
import { GetStaticProps } from 'next'
import { getAllPostsData } from '../utils/getAllPostsData'
import generateRSS from '../utils/generateRSS'
import PostCard from '../components/post-card'

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPostsData()

  // ついでにRSS生成
  generateRSS(allPosts)

  return {
    props: {
      allPosts,
    },
  }
}

export default function Page({ allPosts }: { allPosts: postData[] }) {
  return (
    <ul className="flex flex-col justify-center max-w-4xl w-full">
      {allPosts.map((post) => (
        <PostCard
          key={post.date}
          date={post.date}
          title={post.title}
          description={post.description}
          tags={post.tags}
        />
      ))}
    </ul>
  )
}

Page.getLayout = function getLayout({ page }: { page: ReactElement }) {
  return (
    <Layout>
      <PageLayout h1="Posts">{page}</PageLayout>
    </Layout>
  )
}
