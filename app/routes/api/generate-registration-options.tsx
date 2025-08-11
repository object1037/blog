import {
  generateRegistrationOptions,
  type WebAuthnCredential,
} from '@simplewebauthn/server'
import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { credentialSchema } from '../../lib/webauthn'

const rpName = 'ゆるふわインターネット'
const rpID = 'localhost'

export default createRoute(async (c) => {
  let credential: WebAuthnCredential | undefined
  try {
    const credentialStr = await c.env.KV.get('credential')
    const parsed = JSON.parse(credentialStr ?? '{}')
    credential = credentialStr ? v.parse(credentialSchema, parsed) : undefined
  } catch (e) {
    console.error(e)
    throw new HTTPException(500, { message: 'Failed to parse credential' })
  }

  const excludeCredentials = credential
    ? credential.transports
      ? [
          {
            id: credential.id,
            transports: credential.transports,
          },
        ]
      : [{ id: credential.id }]
    : []

  const options: PublicKeyCredentialCreationOptionsJSON =
    await generateRegistrationOptions({
      rpName,
      rpID,
      userName: 'object1037',
      attestationType: 'none',
      excludeCredentials,
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'required',
        authenticatorAttachment: 'platform',
      },
    })

  c.env.KV.put('registrationOptions', JSON.stringify(options))

  return c.json(options)
})
