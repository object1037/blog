import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

export default jsxRenderer(({ children, heading, isDashboard }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body>
        <Header dashboard={!!isDashboard} />
        <main>
          <h1>{heading}</h1>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
})
