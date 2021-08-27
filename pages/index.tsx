import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { getAllPostsData } from '../lib/getAllPostsMetas'
import PostCard from '../components/post-card'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsMetas = getAllPostsData()
  return {
    props: {
      allPostsMetas
    }
  }
}

export default function Home({
  allPostsMetas
}: {
  allPostsMetas: metaData[]
}) {
  return (
    <>
    <Layout>
      <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">ゆるふわインターネット</h1>
      <ul className="flex flex-col justify-center px-10 max-w-3xl mx-auto w-full">
        {allPostsMetas.map((meta) => (
          <PostCard key={meta.date} date={meta.date} title={meta.title} description={meta.description} tags={meta.tags} />
        ))}
      </ul>
    </Layout>
    </>
  )
}