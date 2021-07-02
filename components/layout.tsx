import Head from 'next/head'
import Header from '../components/header'
import Footer from './footer'
import Date from './date'
import ToC from '../components/toc'
import { useEffect, useState } from 'react'

export const siteTitle = "ゆるふわインターネット"
export const siteUrl = "https://blog.object1037.dev"
export const handleName = "object1037"

export interface tocElement {
  scrollPos: number,
  title: string,
  level: string,
  childEls: tocElement[]
}

export interface metaData {
  title: string,
  description: string,
  date: string
}

let initArr: tocElement[] = new Array({
  scrollPos: 0,
  title: "",
  level: "H2",
  childEls: []
})

export default function Layout({
  children,
  home,
  meta,
}: {
  children: React.ReactNode
  home?: boolean
  meta?: metaData
}) {
  const [tocElements, setTocElements] = useState(initArr)
  useEffect(() => {
    const h2s = Array.from(document.getElementsByTagName("h2"))
    const h3s = Array.from(document.getElementsByTagName("h3"))
    const headings = h2s.concat(h3s)

    headings.sort(function(a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top
    })

    const tocEls: tocElement[] = new Array
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].tagName === "H2") {
        const h2Index = tocEls.push({
          scrollPos: headings[i].getBoundingClientRect().top,
          title: headings[i].innerText,
          level: headings[i].tagName,
          childEls: []
        }) - 1

        while (headings[i + 1] && headings[i + 1].tagName === "H3") {
          tocEls[h2Index].childEls.push({
            scrollPos: headings[i + 1].getBoundingClientRect().top,
            title: headings[i + 1].innerText,
            level: headings[i + 1].tagName,
            childEls: []
          })
          i++
        }
      }
    }
    setTocElements(tocEls)
  }, [])

  if (home) {
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
        <main className="mb-20">{children}</main>
        <Footer />
      </>
    )
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${meta.description} | ${handleName}のブログ`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@object1037" />
        <meta property="og:url" content={`${siteUrl}/posts/${meta.date}`} />
        <meta property="og:title" content={`${meta.title} | ${siteTitle}`} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`https://og-image.object1037.dev/${meta.title}.png?md=1&fontSize=100px`} />
        <title>{meta.title} | {siteTitle}</title>
      </Head>
      <Header />
      <article className="flex flex-col w-screen px-6 post-area mb-20">
        <header className="flex flex-col max-w-6xl pt-8 pb-6 border-gray-600 dark:border-gray-300 border-b w-full mx-auto">
          <h1 className="text-4xl py-4 text-gray-900 dark:text-gray-100 text-center font-bold">{meta.title}</h1>
          <span className="font-light py-3 text-gray-600 dark:text-gray-300 text-center"><Date dateString={meta.date} /></span>
        </header>
        <div className="max-w-6xl w-full flex flex-row-reverse justify-between mx-auto">
          <aside className="py-12">
            <ToC tocElements={tocElements} />
          </aside>
          <section className="max-w-3xl my-10 mx-auto lg:mx-10 w-full">
            {children}
          </section>
        </div>
      </article>
      <Footer />
    </>
  )
}