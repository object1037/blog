import Head from "next/head"
import { siteTitle } from '../components/articleLayout'

export default function Custom404() {
  return (
    <>
    <Head>
      <link
        rel="preload"
        href="/fonts/LVDC-Polly.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <title>{`404 | ${siteTitle}`}</title>
    </Head>
    <main className="flex flex-col justify-center py-6">
      <div className="circle relative rounded-full border-ppink-200 border-solid w-60 h-60 mx-auto my-8">
        <div className="errorCode flex items-center justify-center z-50 animate-none absolute transform translate-y-2 -translate-x-px inset-0 text-center align-baseline tracking-tighter text-gray-900 dark:text-ppink-200">404</div>
        <div className="bar absolute h-6 bg-white dark:bg-gray-900">
          <div className="triangle absolute bottom-full border-solid w-0 h-0"></div>
          <div className="triangle2 absolute top-full border-solid w-0 h-0"></div>
        </div>
      </div>
      <div className="errorSentence text-gray-900 dark:text-gray-100 text-5xl text-center">
        NOT FOUND
      </div>
    </main>
    </>
  )
}