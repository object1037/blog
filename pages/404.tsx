/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet" />
    </Head>
    <div className="circle rounded-full border-ppink border-solid w-60 h-60 mx-auto my-8">
      <div className="bar h-6 bg-white dark:bg-gray-900">
        <div className="triangle border-solid w-0 h-0"></div>
        <div className="triangle2 border-solid w-0 h-0"></div>
      </div>
    </div>
    <div className="errorCode text-gray-900 dark:text-ppink">404</div>
    <div className="errorSentence text-gray-900 dark:text-gray-100 text-4xl text-center">not found</div>
    </>
  )
}