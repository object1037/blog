import type { MetaFunction } from '@remix-run/cloudflare'
import { css } from 'styled-system/css'
import MarkdownIt from 'markdown-it'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async () => {
  const md = new MarkdownIt()
  const result = md.render('# Hello World')
  return { result }
}

export default function Index() {
  return (
    <section>
      <h1 className={css({ fontWeight: 'bold' })}>Blog</h1>
      <p>hello</p>
    </section>
  )
}
