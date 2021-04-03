import Head from 'next/head'
import Header from '../components/header'
import Footer from './Footer'
import Date from './date'

export const siteTitle = "ゆるふわインターネット"
export const siteUrl = "https://blog1037.vercel.app"
export const handleName = "object1037"

export default function Layout({
  children,
  home,
  meta
}: {
  children: React.ReactNode
  home?: boolean
  meta: {
    title: string
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
        <meta property="og:image" content="https://object1037.vercel.app/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75" />
      </Head>
      <Header />
      <main>{children}</main>
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
        <meta property="og:image" content="https://object1037.vercel.app/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css" />
        <title>{meta.title} | {siteTitle}</title>
      </Head>
      <Header />
      <main className="flex flex-col max-w-3xl mx-auto p-10">
        <span className="text-sm text-gray-900 dark:text-gray-200"><Date dateString={meta.date} /></span>
        <h1 className="text-4xl my-4 text-gray-900 dark:text-gray-100">{meta.title}</h1>
        {children}
      </main>
      <Footer />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-core.min.js" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js" />
    </div>
  )
}