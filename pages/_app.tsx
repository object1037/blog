import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { AppProps } from 'next/app'
import { Zen_Maru_Gothic } from '@next/font/google'
import 'highlight.js/styles/atom-one-dark.css'
import '../styles/globals.css'
import 'instantsearch.css/themes/reset.css'
import { useRouter } from 'next/router'

const ZenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '500', '700'],
  variable: '--font-zenmarugothic',
})

type NextPageWithLayout = NextPage & {
  getLayout?: ({
    page,
    tag,
    frontmatter,
  }: {
    page: ReactElement
    tag?: string
    frontmatter?: postData
  }) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const { tag } = router.query
  const getLayout = Component.getLayout ?? (({ page }: { page: any }) => page)
  return getLayout({
    page: (
      <>
        <style jsx global>{`
          html {
            font-family: ${ZenMaruGothic.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </>
    ),
    tag: tag ? (tag as string) : '',
    frontmatter: pageProps.frontmatter ? pageProps.frontmatter : null,
  })
}
