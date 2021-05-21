import Head from 'next/head'
import Header from '../components/header'
import Footer from './Footer'
import Date from './date'

export const siteTitle = "ゆるふわインターネット"
export const siteUrl = "https://blog.object1037.dev"
export const handleName = "object1037"

export default function Layout({
  children,
  home,
  meta
}: {
  children: React.ReactNode
  home?: boolean
  meta?: {
    title: string
    description: string
    date: string
  }
}) {
  if (home) {
    return (
      <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/profile.jpg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${handleName}のブログです`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@object1037" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={`${handleName}のブログ`} />
        <meta property="og:image" content="https://object1037.dev/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75" />
      </Head>
      <Header />
      <main className="mb-20">{children}</main>
      <Footer />
    </div>
    )
  }
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/profile.jpg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${handleName}のブログです`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@object1037" />
        <meta property="og:url" content={`${siteUrl}/posts/${meta.date}`} />
        <meta property="og:title" content={`${meta.title} | ${siteTitle}`} />
        <meta property="og:description" content={`${handleName}のブログ`} />
        <meta property="og:image" content="https://object1037.dev/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75" />
        <title>{meta.title} | {siteTitle}</title>
      </Head>
      <Header />
      <main className="flex flex-col w-screen px-6 post-area mb-20">
        <div className="flex flex-col max-w-5xl pt-8 pb-6 border-gray-600 dark:border-gray-200 border-b w-full mx-auto">
          <h1 className="text-4xl py-4 text-gray-900 dark:text-gray-100 text-center font-bold">{meta.title}</h1>
          <span className="font-light py-3 text-gray-600 dark:text-gray-300 text-center"><Date dateString={meta.date} /></span>
        </div>
        <div className="mx-auto max-w-3xl py-10 w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}