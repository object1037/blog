import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev'

// import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix(),
    tsconfigPaths(),
    // visualizer({ emitFile: true }),
  ],
  server: {
    port: 8788,
  },
})
