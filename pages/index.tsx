import Layout, { handleName, metaData } from '../components/layout'
import { GetStaticProps } from 'next'
import { getAllPostsData } from '../lib/posts'
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
    <Layout home>
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">{handleName}のブログです</h1>
        <ul className="flex flex-col justify-center px-10 max-w-3xl mx-auto w-full">
          {allPostsMetas.map(({date}, index) => (
            <PostCard key={date} date={date} title={allPostsMetas[index].title} description={allPostsMetas[index].description} />
          ))}
        </ul>
      </section>
    </Layout>
  )
}