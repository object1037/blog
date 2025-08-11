import {
  type PublicKeyCredentialCreationOptionsJSON,
  startRegistration,
} from '@simplewebauthn/browser'
import * as v from 'valibot'
import { creationOptionSchema } from '../lib/webauthn'

const getAttResp = async (
  optionsJSON: PublicKeyCredentialCreationOptionsJSON,
) => {
  try {
    return await startRegistration({ optionsJSON })
  } catch (e) {
    if (e instanceof Error && e.name === 'InvalidStateError') {
      console.error(
        'Error: Authenticator was probably already registered by user',
      )
    } else {
      console.error('Unknown error during registration:', e)
    }
    throw e
  }
}

const handleLogin = async () => {
  console.log('Logging in...')

  let optionsJSON: PublicKeyCredentialCreationOptionsJSON
  try {
    const optionsResp = await fetch('/api/generate-registration-options')
    optionsJSON = v.parse(creationOptionSchema, await optionsResp.json())
  } catch (e) {
    console.error('Error fetching registration options:', e)
    return
  }

  const attResp = await getAttResp(optionsJSON)

  const verificationResp = await fetch('/api/verify-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attResp),
  })

  let verificationJSON: { verified: boolean }
  try {
    verificationJSON = v.parse(
      v.object({ verified: v.boolean() }),
      await verificationResp.json(),
    )
  } catch (e) {
    console.error('Error verifying registration response:', e)
    return
  }

  if (verificationJSON.verified) {
    console.log('Success!')
  } else {
    console.log('Login failed.')
  }
}

export const LoginWidget = () => {
  return (
    <div>
      <button onClick={handleLogin} type="button">
        Login
      </button>
    </div>
  )
}
