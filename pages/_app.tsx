import { AppProps } from 'next/app'
import 'highlight.js/styles/atom-one-dark.css'
import '../styles/globals.css'
import 'instantsearch.css/themes/reset.css'
import '../styles/search.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default App