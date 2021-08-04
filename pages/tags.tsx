import { siteTitle, siteUrl } from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import Footer from '../components/footer'
import { GetStaticProps } from 'next'
import { getAllTags } from '../lib/getAllPostsTags'

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
  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="タグ一覧" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@object1037" />
      <meta property="og:url" content={`${siteUrl}/tags`} />
      <meta property="og:title" content="タグ一覧" />
      <meta property="og:description" content="タグ一覧" />
      <meta property="og:image" content="https://object1037.dev/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75" />
      <title>タグ一覧 | {siteTitle}</title>
    </Head>
    <Header />
    <main className="mb-20">
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-xl pb-10 pt-12 text-gray-900 dark:text-gray-100">タグ一覧</h1>
        <div className="mx-6 flex flex-row flex-wrap justify-center">
          {allTags.map((tag) => (
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 m-2 rounded-md" key={tag}>
              <Link href={`/tags/${tag}`}>
                <a>
                  # {tag}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}