import build from '@hono/vite-build/cloudflare-workers'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  plugins: [
    honox({
      client: { input: ['./app/styles/index.css'] },
      devServer: {
        adapter,
        handleHotUpdate: ({ server, modules }) => {
          const isSSR = modules.some((mod) => mod._ssrModule)
          if (isSSR) {
            server.hot.send({ type: 'full-reload' })
            return []
          }
          return modules
        },
      },
    }),
    build(),
  ],
})
