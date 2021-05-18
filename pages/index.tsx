import Head from 'next/head'
import Layout, { siteTitle, handleName } from '../components/layout'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'

let articles = new Array
let promises = new Array

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export const metaH = {
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
  const postsCount = allPostsData.length
  for (let i = 0; i < postsCount; i++) {
    let fileName = allPostsData[i].idN;
    promises.push(import(`./posts/${fileName}.mdx`)
      .then((mod) => articles.push(mod.meta))
    )
  }
  Promise.all(promises).then(() => console.log(articles))
  return (
    <Layout home meta={metaH}>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className="flex flex-col justify-center">
      <span className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100"></span>
    </section>
    </Layout>
  )
}