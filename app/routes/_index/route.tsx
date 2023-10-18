import type { MetaFunction } from '@remix-run/cloudflare'
import { css } from 'styled-system/css'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <section>
      <h1 className={css({ fontWeight: 'bold' })}>Blog</h1>
      <p>hello</p>
    </section>
  )
}
