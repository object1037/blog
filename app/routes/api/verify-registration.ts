import {
  type RegistrationResponseJSON,
  verifyRegistrationResponse,
} from '@simplewebauthn/server'
import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import {
  parseRegOptSchema,
  registrationRespSchema,
  stringifyCredentialSchema,
} from '../../lib/webauthn'

const getVerification = async (
  body: RegistrationResponseJSON,
  challenge: string,
  expectedRPID: string,
  originPort?: string,
) => {
  const expectedOrigin =
    expectedRPID === 'localhost'
      ? `http://localhost:${originPort}`
      : `https://${expectedRPID}`

  try {
    return await verifyRegistrationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin,
      expectedRPID,
    })
  } catch (e) {
    console.error(e)
    throw new HTTPException(400, {
      message: 'Failed to verify registration response',
    })
  }
}

export const POST = createRoute(async (c) => {
  let registrationResponse: RegistrationResponseJSON
  try {
    const body = await c.req.json()
    registrationResponse = v.parse(registrationRespSchema, body)
  } catch (e) {
    console.error(e)
    throw new HTTPException(400, { message: 'Invalid request body' })
  }

  let verification: Awaited<ReturnType<typeof getVerification>>
  try {
    const regOptStr = await c.env.KV.get('registrationOptions')
    const { challenge } = v.parse(parseRegOptSchema, regOptStr)

    verification = await getVerification(
      registrationResponse,
      challenge,
      c.env.RP_ID,
      c.env.ORIGIN_PORT,
    )
  } catch (e) {
    console.error(e)
    throw new HTTPException(500, { message: 'Failed to verify registration' })
  }

  const { verified, registrationInfo } = verification

  if (verified && registrationInfo) {
    const credentialStr = v.parse(
      stringifyCredentialSchema,
      registrationInfo.credential,
    )
    await c.env.KV.put('credential', credentialStr)
  }

  return c.json({ verified: verified })
})
