import Tag from './tag'
import DateDisplay from './date'
import ToC from './toc'
import ToCMobile from './tocMobile'
import Note from './note'
import Share from './share'
import { useEffect, useState } from 'react'
import { siteTitle } from '../constants/data'
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
  meta: postData
}) {
  const [tocElements, setTocElements] = useState(initArr)
  const [intersectingElementId, setIntersectingElementId] = useState("")
  const [elapsedYears, setElapsedYears] = useState(0)

  useEffect(() => {
    const IOOptions = {
      rootMargin: '0px 0px -90% 0px'
    }
    let intersectingElementExist = false
    let IOCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIntersectingElementId(entry.target.id)
          intersectingElementExist = true
        }
      });
      if (!intersectingElementExist) {
        setIntersectingElementId(headings[0].id)
      }
    }
    let observer = new IntersectionObserver(IOCallback, IOOptions)

    const h2s = Array.from(document.getElementsByTagName("h2"))
    const h3s = Array.from(document.getElementsByTagName("h3")).filter(el => el.className != 'sr-only')
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
          title: String(headings[i].firstChild?.textContent),
          level: headings[i].tagName,
          childEls: []
        }) - 1

        while (headings[i + 1] && headings[i + 1].tagName === "H3") {
          tocEls[h2Index].childEls.push({
            scrollPos: headings[i + 1].getBoundingClientRect().top,
            title: String(headings[i + 1].firstChild?.textContent),
            level: headings[i + 1].tagName,
            childEls: []
          })
          i++
        }
      }
    }
    setTocElements(tocEls)
  }, [meta])

  useEffect(() => {
    const dateNow = new Date().getTime();
    //const dateNow = new Date(2022, 9, 20).getTime();
    const datePublished = new Date(+meta.date.substring(0, 4), +meta.date.substring(4, 6) - 1, +meta.date.substring(6, 8)).getTime();
    if (dateNow - datePublished < 157766400000) {
      const elapsedYearsF = (dateNow - datePublished)/31536000000;
      setElapsedYears(Math.floor(elapsedYearsF));
    } else {
      setElapsedYears(5);
    }
  }, [meta])

  const contentWrapperStyle = [
    'mt-5',
    'mb-16',
    'lg:mr-16',
    'flex-grow',
    'max-w-full',
    'min-w-0',
    'dark:border-ngray-600',
    'border-ngray-300'
  ]

  return (
    <>
      <article className="flex flex-col px-6 sm:px-12">
        <header className="max-w-6xl pt-10 pb-8 border-ngray-400 dark:border-ngray-500 border-b w-full mx-auto">
          <div className="max-w-5xl mx-auto w-full">
            <span className="font-normal text-sm text-ngray-600 dark:text-ngray-300"><DateDisplay dateString={meta.date} /></span>
            <h1 className="text-4xl sm:text-4.5xl py-6 text-ngray-900 dark:text-ngray-100 font-bold">{meta.title}</h1>
            <div className="-ml-2 flex flex-row flex-wrap">
              {meta.tags.map((tag) => (
                <Tag name={tag} key={tag} />
              ))}
            </div>
            {meta.draft &&
            <Note type='danger' className='mt-6 mb-2'>This post is a draft</Note>
            }
            {elapsedYears > 0 && 
            <Note type={elapsedYears > 1 ? "danger" : "warn"} className="mt-6 mb-2">
              <p className="my-5">この記事は公開から{elapsedYears}年以上が経過しています</p>
            </Note>
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
    </>
  )
}