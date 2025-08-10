import build from '@hono/vite-build/cloudflare-workers'
import adapter from '@hono/vite-dev-server/cloudflare'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import type { EnvironmentModuleNode, Plugin } from 'vite'
import { defineConfig } from 'vite'

function hmrReload(): Plugin {
  return {
    name: 'hmr-reload',
    enforce: 'post',
    hotUpdate: {
      order: 'post',
      handler({ modules, server, timestamp }) {
        if (this.environment.name !== 'ssr') return

        let hasSsrOnlyModules = false

        const invalidatedModules = new Set<EnvironmentModuleNode>()
        for (const mod of modules) {
          if (mod.id == null) continue
          const clientModule =
            server.environments.client.moduleGraph.getModuleById(mod.id)
          if (clientModule != null) continue

          this.environment.moduleGraph.invalidateModule(
            mod,
            invalidatedModules,
            timestamp,
            true,
          )
          hasSsrOnlyModules = true
        }

        if (hasSsrOnlyModules) {
          server.ws.send({ type: 'full-reload' })
          return []
        }
        return modules
      },
    },
  }
}

export default defineConfig({
  plugins: [
    honox({
      devServer: { adapter },
      client: { input: ['./app/style.css'] },
    }),
    mdx({
      jsxImportSource: 'hono/jsx',
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    tailwindcss(),
    hmrReload(),
    build(),
  ],
})
