import type { WebAuthnCredential } from '@simplewebauthn/server'
import type {} from 'hono'

declare module 'hono' {
  interface Env {
    Variables: {
      credential: WebAuthnCredential | undefined
      session:
        | {
            createdAt: number
            userAgent: string
          }
        | undefined
    }
    Bindings: CloudflareEnv
  }
}
