import build from '@hono/vite-build/cloudflare-workers'
import adapter from '@hono/vite-dev-server/cloudflare'
import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import type { EnvironmentModuleNode, Plugin } from 'vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        client(),
        tailwindcss(),
        honox({
          client: { input: ['./app/style.css'] },
        }),
      ],
    }
  }
  return {
    build: {
      emptyOutDir: false,
    },
    plugins: [
      honox({
        client: { input: ['./app/style.css'] },
        devServer: { adapter },
      }),
      ssg({ entry: './app/server.ts' }),
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
      tailwindcss(),
      hmrReload(),
      build(),
    ],
  }
})

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
