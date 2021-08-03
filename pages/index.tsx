import { handleName, metaData, siteTitle, siteUrl } from '../components/layout'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
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
          {allPostsMetas.map(({date}, index) => (
            <PostCard key={date} date={date} title={allPostsMetas[index].title} description={allPostsMetas[index].description} />
          ))}
        </ul>
      </section>
    </main>
    <Footer />
    </>
  )
}