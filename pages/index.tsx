import Head from 'next/head'
import Layout, { siteTitle, handleName } from '../components/layout'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts'
import PostCard from '../components/post-card'
import { useEffect, useState } from 'react'

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
    id: number
  }[]
}) {
  const postsCount = allPostsData.length
  let articles = new Array
  let promises = new Array(postsCount)
  let initArr = new Array(postsCount)
  initArr.fill({title: "loading...", description: "loading...", date: ''})

  const [metas, setMetas] = useState(initArr)

  let updateFlag = false

  useEffect(() => {
    for (let i = 0; i < postsCount; i++) {
      let fileName = allPostsData[i].id;
      promises.push(import(`./posts/${fileName}.mdx`)
        .then((mod) => {
          articles.push(mod.meta)
        })
      )
    }
    Promise.all(promises).then(() => {
      for (let j = 0; j < postsCount; j++) {
        if (metas[j] != articles[j]) {
          updateFlag = true
        }
      }
      if (updateFlag) {
        setMetas(articles)
      }
    })
  }, [metas]);


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">{handleName}のブログです</h1>
        <ul className="flex flex-col justify-center px-10 max-w-3xl mx-auto w-full">
          {allPostsData.map(({id}, index) => (
            <PostCard key={String(id)} id={id} title={metas[index].title} description={metas[index].description} />
          ))}
        </ul>
      </section>
    </Layout>
  )
}