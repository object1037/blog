import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export const meta = {
  title: '',
  date: ''
}

export default function Home({
  allPostsData
}: {
  allPostsData: {
    title: string
    description: string
    idN: number
  }[]
}) {
  return (
    <Layout home meta={meta}>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className="flex flex-col justify-center">
      <span className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">object_1037のブログです</span>
      <ul className="flex flex-col justify-center px-10 max-w-3xl mx-auto w-full">
        {allPostsData.map(({ idN, title, description }) => (
          <li key={'idN'} className="my-3 bg-gray-100 dark:bg-gray-800 rounded-sm shadow-sm hover:shadow-lg h-30">
            <Link href={`/posts/${idN}`}>
              <a className="flex flex-col h-24 m-4">
                <Date dateString={String(idN)} />
                <span className="text-xl mb-4 text-gray-900 dark:text-gray-100">{title}</span>
                <span className="truncate text-gray-900 dark:text-gray-100">{description}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
    </Layout>
  )
}