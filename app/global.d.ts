import type { WebAuthnCredential } from '@simplewebauthn/server'
import type {} from 'hono'

type Head = {
  heading?: string
  isDashboard?: boolean
}

declare module 'hono' {
  interface Env {
    Variables: {
      credential: WebAuthnCredential | undefined
      session: boolean
    }
    Bindings: CloudflareEnv
  }

  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: Have to use interface for override
    (
      content: string | Promise<string>,
      head?: Head,
    ): Response | Promise<Response>
  }
}
