import {
  base64URLStringToBuffer,
  bufferToBase64URLString,
} from '@simplewebauthn/browser'
import type {
  AuthenticationResponseJSON,
  AuthenticatorAttestationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialDescriptorJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
  WebAuthnCredential,
} from '@simplewebauthn/server'
import * as v from 'valibot'

const transportSchema = v.array(
  v.union([
    v.literal('ble'),
    v.literal('cable'),
    v.literal('hybrid'),
    v.literal('internal'),
    v.literal('nfc'),
    v.literal('smart-card'),
    v.literal('usb'),
  ]),
)

const attachmentSchema = v.union([
  v.literal('platform'),
  v.literal('cross-platform'),
])

const credentialCommonSchema = v.object({
  id: v.string(),
  transports: v.exactOptional(transportSchema),
})

const publicKeyDescSchema = v.object({
  ...credentialCommonSchema.entries,
  type: v.literal('public-key'),
}) satisfies v.GenericSchema<PublicKeyCredentialDescriptorJSON>

const credentialSchema = v.object({
  ...credentialCommonSchema.entries,
  publicKey: v.instance(Uint8Array),
  counter: v.number(),
}) satisfies v.GenericSchema<WebAuthnCredential>

export const stringifyCredentialSchema = v.pipe(
  credentialSchema,
  v.stringifyJson({
    replacer: (key, value) => {
      if (key === 'publicKey') {
        return bufferToBase64URLString(new Uint8Array(value).buffer)
      }
      return value
    },
  }),
)

export const parseCredentialSchema = v.pipe(
  v.string(),
  v.parseJson({
    reviver: (key, value) => {
      if (key === 'publicKey') {
        return new Uint8Array(base64URLStringToBuffer(value))
      }
      return value
    },
  }),
  credentialSchema,
)

const attestationResponseSchema = v.object({
  clientDataJSON: v.string(),
  attestationObject: v.string(),
  authenticatorData: v.exactOptional(v.string()),
  transports: v.exactOptional(transportSchema),
  publicKeyAlgorithm: v.exactOptional(v.number()),
  publicKey: v.exactOptional(v.string()),
}) satisfies v.GenericSchema<AuthenticatorAttestationResponseJSON>

const assertionResponseSchema = v.object({
  clientDataJSON: v.string(),
  authenticatorData: v.string(),
  signature: v.string(),
  userHandle: v.exactOptional(v.string()),
})

const respCommonSchema = v.object({
  id: v.string(),
  rawId: v.string(),
  authenticatorAttachment: attachmentSchema,
  clientExtensionResults: v.object({
    appid: v.exactOptional(v.boolean()),
    credProps: v.exactOptional(
      v.object({
        rk: v.exactOptional(v.boolean()),
      }),
    ),
    hmacCreateSecret: v.exactOptional(v.boolean()),
  }),
  type: v.literal('public-key'),
})

export const registrationRespSchema = v.object({
  ...respCommonSchema.entries,
  response: attestationResponseSchema,
}) satisfies v.GenericSchema<RegistrationResponseJSON>

export const authenticationRespSchema = v.object({
  ...respCommonSchema.entries,
  response: assertionResponseSchema,
}) satisfies v.GenericSchema<AuthenticationResponseJSON>

const hintsSchema = v.array(
  v.union([
    v.literal('hybrid'),
    v.literal('security-key'),
    v.literal('client-device'),
  ]),
)

const attFormatSchema = v.array(
  v.union([
    v.literal('none'),
    v.literal('fido-u2f'),
    v.literal('packed'),
    v.literal('android-safetynet'),
    v.literal('android-key'),
    v.literal('tpm'),
    v.literal('apple'),
  ]),
)

const extensionSchema = v.object({
  appid: v.exactOptional(v.string()),
  credProps: v.exactOptional(v.boolean()),
  hmacCreateSecret: v.exactOptional(v.boolean()),
  minPinLength: v.exactOptional(v.boolean()),
})

const optionCommonSchema = v.object({
  challenge: v.string(),
  hints: v.exactOptional(hintsSchema),
  extensions: v.exactOptional(extensionSchema),
})

export const creationOptionSchema = v.object({
  ...optionCommonSchema.entries,
  rp: v.object({
    id: v.exactOptional(v.string()),
    name: v.string(),
  }),
  user: v.object({
    id: v.string(),
    name: v.string(),
    displayName: v.string(),
  }),
  pubKeyCredParams: v.array(
    v.object({
      alg: v.number(),
      type: v.literal('public-key'),
    }),
  ),
  timeout: v.exactOptional(v.number()),
  excludeCredentials: v.exactOptional(v.array(publicKeyDescSchema)),
  authenticatorSelection: v.exactOptional(
    v.object({
      authenticatorAttachment: attachmentSchema,
      requireResidentKey: v.exactOptional(v.boolean()),
      residentKey: v.literal('required'),
      userVerification: v.literal('required'),
    }),
  ),
  attestation: v.exactOptional(
    v.union([
      v.literal('none'),
      v.literal('indirect'),
      v.literal('direct'),
      v.literal('enterprise'),
    ]),
  ),
  attestationFormats: v.exactOptional(attFormatSchema),
}) satisfies v.GenericSchema<PublicKeyCredentialCreationOptionsJSON>

export const requestOptionSchema = v.object({
  ...optionCommonSchema.entries,
  challenge: v.string(),
  rpId: v.exactOptional(v.string()),
  allowCredentials: v.pipe(
    v.array(publicKeyDescSchema),
    v.minLength(1),
    v.maxLength(1),
  ),
  userVerification: v.literal('required'),
}) satisfies v.GenericSchema<PublicKeyCredentialRequestOptionsJSON>
