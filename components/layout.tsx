import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { siteTitle, handleName, siteUrl, accounts, getOgImageUrl } from '../constants/data'
import { useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'

export default function Layout({
  title = siteTitle,
  description = `${handleName}のブログ`,
  imgUrl = `${siteUrl}/images/profile.jpg`,
  url = siteUrl,
  meta,
  children,
}: {
  title?: string
  description?: string
  imgUrl?: string
  url?: string
  meta?: postData
  children: React.ReactNode
}) {
  useEffect(() => {
    loadCSS(
      "https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css",
      undefined,
      undefined,
      {
        "crossorigin": "anonymous",
        "integrity": "sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
      }
    )
  }, [])

  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={meta ? `${meta.description} | ${handleName}のブログ` : description} />
      <meta name="twitter:card" content={meta ? "summary_large_image" : "summary"} />
      <meta name="twitter:creator" content={`@${accounts.twitter}`} />
      <meta property="og:title" content={meta ? `${meta.title} | ${siteTitle}` : title} />
      <meta property="og:url" content={meta ? `${siteUrl}/posts/${meta.date}` : url} />
      <meta property="og:description" content={meta ? meta.description : description} />
      <meta property="og:image" content={meta ? meta.ogImgUrl ? meta.ogImgUrl : getOgImageUrl(meta.title) : imgUrl} />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" title={siteTitle} />
      <link rel='canonical' href={meta ? `${siteUrl}/posts/${meta.date}` : url} />
      <title>{meta ? `${meta.title} | ${siteTitle}` : title}</title>
    </Head>
    <Header sticky={meta ? false : true}/>
      {children}
    <Footer />
    </>
  )
}