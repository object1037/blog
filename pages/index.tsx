import Head from 'next/head'
import Layout, { siteTitle, handleName } from '../components/layout'
import { GetStaticProps } from 'next'
import { getAllPostsData } from '../lib/posts'
import PostCard from '../components/post-card'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsDatas = getAllPostsData()
  return {
    props: {
      allPostsDatas
    }
  }
}

export default function Home({
  allPostsDatas
}: {
  allPostsDatas: {
    date: string,
    title: string,
    description: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">{handleName}のブログです</h1>
        <ul className="flex flex-col justify-center px-10 max-w-3xl mx-auto w-full">
          {allPostsDatas.map(({date}, index) => (
            <PostCard key={date} date={date} title={allPostsDatas[index].title} description={allPostsDatas[index].description} />
          ))}
        </ul>
      </section>
    </Layout>
  )
}