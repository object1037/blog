import {
  generateRegistrationOptions,
  type WebAuthnCredential,
} from '@simplewebauthn/server'
import { createRoute } from 'honox/factory'
import { getCredentials } from '../../middlewares/getCredentials'

const rpName = 'ゆるふわインターネット'
const rpID = 'localhost'

export default createRoute(getCredentials, async (c) => {
  const credential = c.get('credential')
  let excludeCredentials: Pick<WebAuthnCredential, 'id' | 'transports'>[] = []

  if (credential) {
    const { publicKey: _p, counter: _c, ...rest } = credential
    excludeCredentials = [rest]
  }

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
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
