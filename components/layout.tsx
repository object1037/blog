import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { siteTitle, handleName } from './articleLayout'

export default function Layout({
  title = siteTitle,
  description = `${handleName}のブログです`,
  imgUrl = "https://object1037.dev/images/profile.jpg",
  children,
}: {
  title?: string,
  description?: string,
  imgUrl?: string,
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
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />
      <title>{title}</title>
    </Head>
    <Header />
    <main className="post-area mb-20">
      <section className="flex flex-col justify-center">
        {children}
      </section>
    </main>
    <Footer />
    </>
  )
}