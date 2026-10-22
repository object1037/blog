import { Hono } from 'hono'
import { css, Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { HonoXIsland } from 'honox/vite/components/honox-island'
import { expect, test } from 'vitest'

// `hono/css` returns a Promise-like class name during SSR. Rendering an island
// that uses it therefore becomes asynchronous. HonoX checks the island context
// to decide whether an island is nested; the context must be restored before
// the next sibling island is rendered, even when that sibling's render is async.
const StyledComponent = ({ label }: { label: string }) => {
  const className = css`
    color: red;
  `
  return <span class={className}>{label}</span>
}

const Island = ({ label }: { label: string }) => (
  <HonoXIsland
    componentName={`/app/islands/${label}.tsx`}
    componentExport="default"
    Component={StyledComponent}
    props={{ label }}
  />
)

test('wraps every top-level island even when an island renders asynchronously', async () => {
  const app = new Hono()
  app.use(
    jsxRenderer(({ children }) => (
      <html lang="en">
        <head>
          <Style />
        </head>
        <body>{children}</body>
      </html>
    )),
  )
  app.get('/', (c) =>
    c.render(
      <main>
        <Island label="a" />
        <Island label="b" />
        <Island label="c" />
      </main>,
    ),
  )

  const response = await app.request('/')
  const html = await response.text()

  expect(html.match(/<honox-island/g)).toHaveLength(3)
})
