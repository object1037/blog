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
    <section className="flex flex-col justify-center">
      <span className="text-center text-xl pb-10 pt-12">object_1037のブログです</span>
      <ul className="flex flex-col justify-center px-10 max-w-3xl text-gray-900 mx-auto w-full">
        {allPostsData.map(({ idN, title }) => (
          <li key={'idN'} className="my-3 bg-gray-100 rounded-sm shadow-sm hover:shadow-lg h-24">
            <Link href={`/posts/${idN}`}>
              <a className="flex flex-col h-full m-4">
                <Date dateString={String(idN)} />
                <span className="text-xl">{title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
    </Layout>
  )
}