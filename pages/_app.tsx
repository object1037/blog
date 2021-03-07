import { AppProps } from 'next/app'
import '../styles/globals.css'
import {MDXProvider} from '@mdx-js/react'

const mdComponents = {
  h2: (props) => <h2 className="hidden">{props.children}</h2>,
  hr: (props) => <hr className="hidden" />
}

function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App