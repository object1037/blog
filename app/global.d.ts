import type { WebAuthnCredential } from '@simplewebauthn/server'
import type {} from 'hono'

declare module 'hono' {
  interface Env {
    Variables: Cloudflare.Env
    Bindings: Cloudflare.Env
  }

  interface ContextVariableMap {
    credential: WebAuthnCredential | undefined
  }
}
