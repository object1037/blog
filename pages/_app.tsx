import { AppProps } from 'next/app'
import '../styles/globals.css'
import "../styles/prism.css";
import {MDXProvider} from '@mdx-js/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const mdComponents = {
  h1: (props) => <h1 className="text-3xl font-semibold mb-6 mt-8 py-2 border-b border-gray-400">{props.children}</h1>,
  h2: (props) => <h2 className="text-2xl font-semibold mt-4 py-2">{props.children}</h2>,
  h3: (props) => <h3 className="text-xl font-medium mt-2 py-2">{props.children}</h3>,
  p: (props) => <p className="text-base leading-relaxed pt-2">{props.children}</p>,
  ul: (props) => <ul className="list-disc ml-6 py-2">{props.children}</ul>,
  ol: (props) => <ol className="list-decimal ml-6 py-2">{props.children}</ol>,
  a: (props) => <a target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300" {...props} />,
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