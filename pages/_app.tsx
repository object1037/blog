import { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/prism.css'
import {MDXProvider} from '@mdx-js/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const mdComponents = {
  h3: (props) => <h2 className="text-3xl mt-4 mb-2 py-2 border-b-2 border-gray-300">{props.children}</h2>,
  p: (props) => <p className="text-base py-2">{props.children}</p>,
  h4: (props) => <h3 className="text-2xl py-2">{props.children}</h3>,
  ul: (props) => <ul className="list-disc ml-6 py-2">{props.children}</ul>,
  a: (props) => <a target="_blank" rel="noopener" className="text-Blue-500 dark:text-Blue-300" {...props} />,
  code: (props) => <code className="text-sm">{props.children}</code>,
  blockquote: (props) => <blockquote className="italic text-gray-500 dark:text-gray-300 border-l-4 pl-4 py-4 my-3">{props.children}</blockquote>,
}

function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App