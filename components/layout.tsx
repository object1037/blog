import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { siteTitle, handleName, siteUrl } from '../constants/data'
import clsx from 'clsx'

export default function Layout({
  title = siteTitle,
  description = `${handleName}のブログです`,
  imgUrl = `${siteUrl}/images/profile.jpg`,
  url = siteUrl,
  h1,
  children,
}: {
  title?: string,
  description?: string,
  imgUrl?: string,
  url?: string,
  h1: string | JSX.Element,
  children: React.ReactNode,
}) {
  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@object1037" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />
      <title>{title}</title>
    </Head>
    <Header sticky/>
    <main className="mb-20 px-6 sm:px-12">
      <section className="flex flex-col justify-center items-center max-w-4xl mx-auto">
        <h1 className={clsx(
          'self-start',
          'text-4xl',
          'font-bold',
          'text-gray-900',
          'dark:text-gray-100',
          'pt-12',
          'pb-10'
        )}>{h1}</h1>
        {children}
      </section>
    </main>
    <Footer />
    </>
  )
}