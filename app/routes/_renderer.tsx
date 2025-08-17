import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { css } from '../../styled-system/css'
import { container, divider } from '../../styled-system/patterns'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

export default jsxRenderer(({ children, heading, isDashboard }) => {
  const containerStyle = container({
    maxWidth: '3xl',
    px: { base: '7', md: '8', lg: '10' },
  })
  const dividerStyle = divider({
    color: 'neutral.700',
    w: '10',
    mt: '2',
  })
  const headingStyle = css({
    fontSize: '5xl',
    fontWeight: 'bold',
    py: '6',
  })

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/styles/index.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body>
        <Header dashboard={!!isDashboard} />
        <main class={containerStyle}>
          <div class={dividerStyle}></div>
          <article>
            <h1 class={headingStyle}>{heading}</h1>
            {children}
          </article>
        </main>
        <Footer />
      </body>
    </html>
  )
})
