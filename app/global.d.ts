import type {} from 'hono'

declare module 'hono' {
  interface Env {
    Variables: Cloudflare.Env
    Bindings: Cloudflare.Env
  }
}
