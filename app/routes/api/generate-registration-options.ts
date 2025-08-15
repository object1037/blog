import { generateRegistrationOptions } from '@simplewebauthn/server'
import { createRoute } from 'honox/factory'
import { getCredentials } from '../../middlewares/getCredentials'

export default createRoute(getCredentials, async (c) => {
  const credential = c.get('credential')
  if (credential) {
    return c.json({ alreadyRegistered: true })
  }

  const options = await generateRegistrationOptions({
    rpName: 'ゆるふわインターネット',
    rpID: c.env.RP_ID,
    userName: 'object1037',
    attestationType: 'none',
    excludeCredentials: [],
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'required',
      authenticatorAttachment: 'platform',
    },
    preferredAuthenticatorType: 'localDevice',
  })

  await c.env.KV.put('registrationChallenge', options.challenge)

  return c.json(options)
})
