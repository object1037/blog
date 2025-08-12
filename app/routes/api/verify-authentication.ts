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

const getVerification = async (
  body: AuthenticationResponseJSON,
  challenge: string,
  credential: WebAuthnCredential,
) => {
  try {
    return await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: 'http://localhost:5173',
      expectedRPID: 'localhost',
      credential,
    })
  } catch (e) {
    console.error(e)
    throw new HTTPException(400, {
      message: 'Failed to verify authentication response',
    })
  }
}

export const POST = createRoute(getCredentials, async (c) => {
  let authenticationResponse: AuthenticationResponseJSON
  try {
    const body = await c.req.json()
    authenticationResponse = v.parse(authenticationRespSchema, body)
  } catch (e) {
    console.error(e)
    throw new HTTPException(400, { message: 'Invalid request body' })
  }

  const credential = c.get('credential')
  if (!credential) {
    throw new HTTPException(400, { message: 'No credentials found' })
  }

  let verification: Awaited<ReturnType<typeof getVerification>>
  try {
    const { challenge } = JSON.parse(
      (await c.env.KV.get('authenticationOptions')) ?? '{}',
    )
    verification = await getVerification(
      authenticationResponse,
      challenge,
      credential,
    )
  } catch (e) {
    console.error(e)
    throw new HTTPException(500, { message: 'Failed to verify authentication' })
  }

  const { verified, authenticationInfo } = verification

  if (verified && authenticationInfo) {
    const { counter: _c, ...rest } = credential
    const credentialStr = v.parse(stringifyCredentialSchema, {
      counter: authenticationInfo.newCounter,
      ...rest,
    })
    await c.env.KV.put('credential', credentialStr)
  }

  return c.json({ verified: verified })
})
