import {
  generateAuthenticationOptions,
  type WebAuthnCredential,
} from '@simplewebauthn/server'
import { createRoute } from 'honox/factory'
import { getCredentials } from '../../middlewares/getCredentials'

const rpID = 'localhost'

export default createRoute(getCredentials, async (c) => {
  const credential = c.get('credential')
  let allowCredentials: Pick<WebAuthnCredential, 'id' | 'transports'>[] = []

  if (credential) {
    const { publicKey: _p, counter: _c, ...rest } = credential
    allowCredentials = [rest]
  }

  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials,
    userVerification: 'required',
  })

  c.env.KV.put('authenticationOptions', JSON.stringify(options))

  return c.json(options)
})
