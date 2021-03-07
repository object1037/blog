import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({
  allPostsData
}: {
  allPostsData: {
    title: string
    idN: number
  }[]
}) {
  return (
    <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <header className="flex flex-row space-x-4 p-4 bg-gray-300 items-center h-16">
      <Link href="https://object1037.vercel.app">
        <a>About</a>
      </Link>
    </header>
    <ul>
      {allPostsData.map(({ idN, title }) => (
        <li key={'idN'}>
          <Link href={`/posts/${idN}`}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
    </Layout>
  )
}