import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/header'
import Footer from '../components/footer'

export const siteTitle = "ゆるふわインターネット"

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
        <meta name="description" content="object_1037のブログです。" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@object_1037" />
        <meta property="og:url" content="" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteTitle} />
        <meta property="og:image" content="" />
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
        <meta name="description" content="object_1037のブログです。" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@object_1037" />
        <meta property="og:url" content="" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteTitle} />
        <meta property="og:image" content="" />
        <title>{meta.title} | {siteTitle}</title>
      </Head>
      <Header />
      <main className="flex flex-col max-w-3xl mx-auto p-10">
        <span className="text-sm">{meta.date}</span>
        <h1 className="text-4xl my-4">{meta.title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  )
}