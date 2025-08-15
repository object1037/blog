import { vValidator } from '@hono/valibot-validator'
import {
  type AuthenticationResponseJSON,
  verifyAuthenticationResponse,
  type WebAuthnCredential,
} from '@simplewebauthn/server'
import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import {
  authenticationRespSchema,
  stringifyCredentialSchema,
} from '../../lib/webauthn'
import { getCredentials } from '../../middlewares/getCredentials'
import { createSession } from '../../services/session'

const getVerification = async (
  body: AuthenticationResponseJSON,
  challenge: string,
  credential: WebAuthnCredential,
  expectedRPID: string,
  originPort?: string,
) => {
  const expectedOrigin =
    expectedRPID === 'localhost'
      ? `http://localhost:${originPort}`
      : `https://${expectedRPID}`

  try {
    return await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin,
      expectedRPID,
      credential,
    })
  } catch (e) {
    console.error(e)
    throw new HTTPException(400, {
      message: 'Failed to verify authentication response',
    })
  }
}

export const POST = createRoute(
  vValidator('json', authenticationRespSchema),
  getCredentials,
  async (c) => {
    const authenticationResponse = c.req.valid('json')

    const credential = c.get('credential')
    if (!credential) {
      throw new HTTPException(400, { message: 'No credentials found' })
    }

    let verification: Awaited<ReturnType<typeof getVerification>>
    try {
      const authChallenge = await c.env.KV.get('authenticationChallenge')

      if (!authChallenge) {
        throw new HTTPException(500, {
          message: 'No authentication challenge found',
        })
      }

      await c.env.KV.delete('authenticationChallenge')

      verification = await getVerification(
        authenticationResponse,
        authChallenge,
        credential,
        c.env.RP_ID,
        c.env.ORIGIN_PORT,
      )
    } catch (e) {
      console.error(e)
      throw new HTTPException(500, {
        message: 'Failed to verify authentication',
      })
    }

    const { verified, authenticationInfo } = verification

    if (verified && authenticationInfo) {
      const { counter: _c, ...rest } = credential
      const credentialStr = v.parse(stringifyCredentialSchema, {
        counter: authenticationInfo.newCounter,
        ...rest,
      })

      await Promise.all([
        c.env.KV.put('credential', credentialStr),
        createSession(c),
      ])
    }

    return c.json({ verified: verified })
  },
)
