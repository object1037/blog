import { generateAuthenticationOptions } from '@simplewebauthn/server'
import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import { getCredentials } from '../../middlewares/getCredentials'

export default createRoute(getCredentials, async (c) => {
  const credential = c.get('credential')

  if (!credential) {
    throw new HTTPException(500, { message: 'Credential not found' })
  }

  const { publicKey: _p, counter: _c, ...rest } = credential

  const options = await generateAuthenticationOptions({
    rpID: c.env.RP_ID,
    allowCredentials: [rest],
    userVerification: 'required',
  })

  await c.env.KV.put('authenticationChallenge', options.challenge)

  return c.json(options)
})
