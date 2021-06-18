import { AppProps } from 'next/app'
import '../styles/globals.css'
import "../styles/prism.css";
import {MDXProvider} from '@mdx-js/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import H1 from '../components/mdComponents/H1'
import H2 from '../components/mdComponents/H2'
import H3 from '../components/mdComponents/H3'
import Paragraph from '../components/mdComponents/Paragraph';
import Ul from '../components/mdComponents/Ul'
import Ol from '../components/mdComponents/Ol'
import Anchor from '../components/mdComponents/Anchor'
import Code from '../components/mdComponents/Code'
import InlineCode from '../components/mdComponents/inline-code'
import Blockquote from '../components/mdComponents/Blockquote'
library.add(fab)

const mdComponents = {
  h1: (props: HTMLElement) => H1(props), 
  h2: (props: HTMLElement) => H2(props),
  h3: (props: HTMLElement) => H3(props),
  p: (props: HTMLElement) => Paragraph(props),
  ul: (props: HTMLElement) => Ul(props),
  ol: (props: HTMLElement) => Ol(props),
  a: (props: HTMLAnchorElement) => Anchor(props),
  code: (props: HTMLElement) => Code(props),
  inlineCode: (props: HTMLElement) => InlineCode(props),
  blockquote: (props: HTMLElement) => Blockquote(props),
}

function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App