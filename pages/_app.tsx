import { AppProps } from 'next/app'
import '../styles/globals.css'
import "../styles/prism.css";
import {MDXProvider} from '@mdx-js/react'
import H2 from '../components/mdComponents/H2'
import H3 from '../components/mdComponents/H3'
import H4 from '../components/mdComponents/H4'
import Paragraph from '../components/mdComponents/Paragraph';
import Ul from '../components/mdComponents/Ul'
import Ol from '../components/mdComponents/Ol'
import Li from '../components/mdComponents/Li'
import Anchor from '../components/mdComponents/Anchor'
import Code from '../components/mdComponents/Code'
import InlineCode from '../components/mdComponents/inline-code'
import Blockquote from '../components/mdComponents/Blockquote'
import Im from "../components/im"

const mdComponents = {
  h1: (props: HTMLElement) => H2(props), 
  h2: (props: HTMLElement) => H3(props),
  h3: (props: HTMLElement) => H4(props),
  p: (props: HTMLElement) => Paragraph(props),
  ul: (props: HTMLElement) => Ul(props),
  ol: (props: HTMLElement) => Ol(props),
  li: (props: HTMLElement) => Li(props),
  a: (props: HTMLAnchorElement) => Anchor(props),
  code: (props: HTMLElement) => Code(props),
  inlineCode: (props: HTMLElement) => InlineCode(props),
  blockquote: (props: HTMLElement) => Blockquote(props),
  Im,
}

function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App