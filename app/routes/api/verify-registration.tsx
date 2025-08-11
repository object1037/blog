import {
  type RegistrationResponseJSON,
  verifyRegistrationResponse,
} from '@simplewebauthn/server'
import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { registrationRespSchema } from '../../lib/webauthn'

const getVerification = async (
  body: RegistrationResponseJSON,
  challenge: string,
) => {
  try {
    return await verifyRegistrationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: 'http://localhost:5173',
      expectedRPID: 'localhost',
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
    const { challenge } = JSON.parse(
      (await c.env.KV.get('registrationOptions')) ?? '{}',
    )
    verification = await getVerification(registrationResponse, challenge)
  } catch (e) {
    console.error(e)
    throw new HTTPException(500, { message: 'Failed to verify registration' })
  }

  if (verification.registrationInfo) {
    await c.env.KV.put(
      'credential',
      JSON.stringify(verification.registrationInfo.credential),
    )
  }

  return c.json({ verified: verification.verified })
})
