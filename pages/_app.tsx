import { AppProps } from 'next/app'
import '../styles/globals.css'
import {MDXProvider} from '@mdx-js/react'

const mdComponents = {
  h2: (props) => <h2 className="hidden">{props.children}</h2>,
  hr: (props) => <hr className="hidden" />,
  h3: (props) => <h2 className="text-3xl mt-4 mb-2 py-2 border-b-2 border-gray-300">{props.children}</h2>,
  p: (props) => <p className="text-base py-2">{props.children}</p>,
  h4: (props) => <h3 className="text-2xl py-2">{props.children}</h3>,
  ul: (props) => <ul className="list-disc ml-6 py-2">{props.children}</ul>,
}

function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App