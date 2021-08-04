import { handleName, metaData, siteTitle, siteUrl } from '../components/layout'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import { GetStaticProps } from 'next'
import { getAllTags } from '../lib/getAllPostsTags'
import { useEffect } from 'react'

export const getStaticProps: GetStaticProps = async () => {
  const allTags = getAllTags()
  return {
    props: {
      allTags
    }
  }
}

export default function Home({
  allTags
}: {
  allTags: string[]
}) {
  useEffect(() => {
    console.log(allTags)
  })

  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={`${handleName}のブログです`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@object1037" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={`${handleName}のブログ`} />
      <meta property="og:image" content="https://object1037.dev/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75" />
      <title>{siteTitle}</title>
    </Head>
    <Header />
    <main className="mb-20">
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">{handleName}のブログです</h1>
        <ul className="flex flex-col justify-center px-10 max-w-3xl mx-auto w-full">
          
        </ul>
      </section>
    </main>
    <Footer />
    </>
  )
}