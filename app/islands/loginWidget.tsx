import {
  type PublicKeyCredentialCreationOptionsJSON,
  type PublicKeyCredentialRequestOptionsJSON,
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser'
import { css } from 'hono/css'
import { KeyRound } from 'lucide'
import * as v from 'valibot'
import { LucideIcon } from '../components/lucideIcon'
import { creationOptionSchema, requestOptionSchema } from '../lib/webauthn'

const verificationSchema = v.object({
  verified: v.literal(true),
})
const alreadyRegisteredSchema = v.object({
  alreadyRegistered: v.literal(true),
})

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
      console.error('Unknown error during registration:')
    }
    throw e
  }
}

const getAsseResp = async (
  optionsJSON: PublicKeyCredentialRequestOptionsJSON,
) => {
  try {
    return await startAuthentication({ optionsJSON })
  } catch (e) {
    console.error('Error during authentication:')
    throw e
  }
}

const handleRegistration = async () => {
  let parsedOptions: PublicKeyCredentialCreationOptionsJSON
  try {
    const optionsResp = await fetch('/api/generate-registration-options')
    const optionsJSON = await optionsResp.json()
    const checkAlreadyRegistered = v.safeParse(
      alreadyRegisteredSchema,
      optionsJSON,
    )
    if (checkAlreadyRegistered.success) {
      await handleAuthentication()
      return
    }
    parsedOptions = v.parse(creationOptionSchema, optionsJSON)
  } catch (e) {
    console.error('Error fetching registration options:')
    throw e
  }

  const attResp = await getAttResp(parsedOptions)

  const verificationResp = await fetch('/api/verify-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attResp),
  })

  try {
    v.parse(verificationSchema, await verificationResp.json())
  } catch (e) {
    console.error('Error verifying registration response:')
    throw e
  }
}

const handleAuthentication = async () => {
  let optionsJSON: PublicKeyCredentialRequestOptionsJSON
  try {
    const optionsResp = await fetch('/api/generate-authentication-options')
    optionsJSON = v.parse(requestOptionSchema, await optionsResp.json())
  } catch (e) {
    console.error('Error fetching authentication options:')
    throw e
  }

  const asseResp = await getAsseResp(optionsJSON)

  const verificationResp = await fetch('/api/verify-authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(asseResp),
  })

  try {
    v.parse(verificationSchema, await verificationResp.json())
  } catch (e) {
    console.error('Error verifying authentication response:')
    throw e
  }
}

export const LoginWidget = () => {
  const handleLogin = async () => {
    try {
      await handleRegistration()
      window.location.replace('/dashboard')
    } catch (e) {
      console.error('Error during login process:', e)
    }
  }

  const loginBStyle = css`
    display: flex;
    align-items: center;
    font-weight: 500;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background-color: #e5e5e5;
    }
  `

  return (
    <div>
      <button onClick={handleLogin} type="button" class={loginBStyle}>
        Login with
        <LucideIcon icon={KeyRound} title="Key" />
      </button>
    </div>
  )
}
