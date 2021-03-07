import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/header'

export const siteTitle = "object_1037's blog"

export default function Layout({
  children,
  home,
  meta
}: {
  children: React.ReactNode
  home?: boolean
  meta: {
    title: string
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
      <h1>{meta.title}</h1>
      <main>{children}</main>
      <div>
        <Link href="/">
          <a>Back Home</a>
        </Link>
      </div>
    </div>
  )
}