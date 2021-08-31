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
    <Layout h1="Posts">
      <ul className="flex flex-col justify-center max-w-4xl w-full">
        {allPostsMetas.map((meta) => (
          <PostCard key={meta.date} date={meta.date} title={meta.title} description={meta.description} tags={meta.tags} />
        ))}
      </ul>
    </Layout>
    </>
  )
}