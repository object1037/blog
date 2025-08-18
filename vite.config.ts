import build from '@hono/vite-build/cloudflare-workers'
import adapter from '@hono/vite-dev-server/cloudflare'
import { parse } from 'es-module-lexer'
import honox from 'honox/vite'
import { defineConfig, type Plugin } from 'vite'

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
    clientOnly(),
    build(),
  ],
})

function clientOnly(): Plugin {
  return {
    name: 'dot-client-only',
    async transform(code, id, options) {
      if (!options?.ssr) return
      const clientFileRE = /\.client(\.[cm]?[jt]sx?)?$/
      const clientDirRE = /\/\.client\//
      if (clientFileRE.test(id) || clientDirRE.test(id)) {
        const exports = parse(code)[1]
        return {
          code: exports
            .map(({ n }: { n: string }) =>
              n === 'default'
                ? 'export default undefined;'
                : `export const ${n} = undefined;`,
            )
            .join('\n'),
          map: null,
        }
      }
      return
    },
  }
}
