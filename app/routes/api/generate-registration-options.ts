import {
  generateRegistrationOptions,
  type WebAuthnCredential,
} from '@simplewebauthn/server'
import { createRoute } from 'honox/factory'
import { getCredentials } from '../../middlewares/getCredentials'

export default createRoute(getCredentials, async (c) => {
  const credential = c.get('credential')
  let excludeCredentials: Pick<WebAuthnCredential, 'id' | 'transports'>[] = []

  if (credential) {
    const { publicKey: _p, counter: _c, ...rest } = credential
    excludeCredentials = [rest]
  }

  const options = await generateRegistrationOptions({
    rpName: 'ゆるふわインターネット',
    rpID: c.env.RP_ID,
    userName: 'object1037',
    attestationType: 'none',
    excludeCredentials,
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'required',
      authenticatorAttachment: 'platform',
    },
  })

  c.env.KV.put('registrationOptions', JSON.stringify(options))

  return c.json(options)
})
