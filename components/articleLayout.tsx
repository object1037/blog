import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import Tag from './tag'
import DateDisplay from './date'
import ToC from './toc'
import ToCMobile from './tocMobile'
import Note from './note'
import Share from './share'
import { useEffect, useState } from 'react'
import { siteTitle, siteUrl, handleName } from '../constants/data'
import clsx from 'clsx'

let initArr: tocElement[] = new Array({
  scrollPos: 0,
  title: "",
  level: "H2",
  childEls: []
})

export default function ArticleLayout({
  children,
  meta,
}: {
  children: React.ReactNode
  meta: metaData
}) {
  const [tocElements, setTocElements] = useState(initArr)
  const [intersectingElementId, setIntersectingElementId] = useState("")
  const [elapsedYears, setElapsedYears] = useState(0)

  useEffect(() => {
    const IOOptions = {
      rootMargin: '0px 0px -90% 0px'
    }
    let IOCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIntersectingElementId(entry.target.id)
        }
      });
    }
    let observer = new IntersectionObserver(IOCallback, IOOptions)

    const h2s = Array.from(document.getElementsByTagName("h2"))
    const h3s = Array.from(document.getElementsByTagName("h3"))
    const headings = h2s.concat(h3s)

    headings.sort(function(a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top
    })

    for (let i = 0; i < headings.length; i++) {
      observer.observe(headings[i])
    }

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

  useEffect(() => {
    const dateNow = new Date().getTime();
    //const dateNow = new Date(2022, 3, 20).getTime();
    const datePublished = new Date(+meta.date.substr(0, 4), +meta.date.substr(4, 2) - 1, +meta.date.substr(6, 2)).getTime();
    if (dateNow - datePublished < 157766400000) {
      const elapsedYearsF = (dateNow - datePublished)/31536000000;
      setElapsedYears(Math.floor(elapsedYearsF));
    } else {
      setElapsedYears(5);
    }
  }, [meta])

  const contentWrapperStyle = [
    'mt-10',
    'mb-16',
    'lg:mr-16',
    'flex-grow',
    'max-w-full',
    'min-w-0',
    'border-b',
    'dark:border-gray-600',
    'border-gray-300'
  ]

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
        <meta property="og:image" content={meta.ogImgUrl ? meta.ogImgUrl : `https://og-image.object1037.dev/${meta.title}.png?fontSize=64px`} />
        <title>{meta.title} | {siteTitle}</title>
      </Head>
      <Header />
      <article className="flex flex-col px-6 sm:px-12">
        <header className="max-w-6xl pt-10 pb-8 border-gray-600 dark:border-gray-300 border-b w-full mx-auto">
          <div className="max-w-5xl mx-auto w-full">
            <span className="font-normal text-sm text-gray-600 dark:text-gray-300"><DateDisplay dateString={meta.date} /></span>
            <h1 className="text-4xl sm:text-4.5xl py-6 text-gray-900 dark:text-gray-100 font-bold">{meta.title}</h1>
            <div className="-ml-2 flex flex-row flex-wrap">
              {meta.tags.map((tag) => (
                <Tag name={tag} key={tag} />
              ))}
            </div>
            {elapsedYears > 0 && 
            <Note type={elapsedYears > 1 ? "danger" : "warn"} className="mt-6">この記事は公開から{elapsedYears}年以上が経過しています</Note>
            }
          </div>
        </header>
        <div className="max-w-5xl w-full mx-auto flex flex-row justify-between">
          <section className={clsx(contentWrapperStyle)}>
            {children}
            <Share date={meta.date} title={meta.title} siteTitle={siteTitle} />
          </section>
          <div className="py-12 hidden lg:block">
            <ToC tocElements={tocElements} intersectingElementId={intersectingElementId} />
          </div>
        </div>
      </article>
      <ToCMobile tocElements={tocElements} intersectingElementId={intersectingElementId} />
      <Footer />
    </>
  )
}