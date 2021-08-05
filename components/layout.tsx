import Head from 'next/head'
import Header from './header'
import Footer from './footer'

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:image" content="https://object1037.dev/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75" />
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