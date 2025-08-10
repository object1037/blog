import type {} from 'hono'

declare module 'hono' {
  interface Env {
    Variables: {
      MY_VAR: string
    }
    Bindings: {
      DB: D1Database
    }
  }
}
