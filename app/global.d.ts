import type {} from 'hono'
import type { Frontmatter } from './types'

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {}
  }

  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: interface should be used for overloading
    (
      content: string | Promise<string>,
      frontmatter?: { frontmatter: Frontmatter },
    ): Response | Promise<Response>
  }
}
