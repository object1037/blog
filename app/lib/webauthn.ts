import type {
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

const credentialCommonSchema = v.object({
  id: v.string(),
  transports: v.exactOptional(transportSchema),
})

const publicKeyDescSchema = v.object({
  ...credentialCommonSchema.entries,
  type: v.literal('public-key'),
}) satisfies v.GenericSchema<PublicKeyCredentialDescriptorJSON>

export const credentialSchema = v.object({
  ...credentialCommonSchema.entries,
  publicKey: v.instance(Uint8Array),
  counter: v.number(),
}) satisfies v.GenericSchema<WebAuthnCredential>

const attestationResponseSchema = v.object({
  clientDataJSON: v.string(),
  attestationObject: v.string(),
  authenticatorData: v.exactOptional(v.string()),
  transports: v.exactOptional(transportSchema),
  publicKeyAlgorithm: v.exactOptional(v.number()),
  publicKey: v.exactOptional(v.string()),
}) satisfies v.GenericSchema<AuthenticatorAttestationResponseJSON>

export const registrationRespSchema = v.object({
  id: v.string(),
  rawId: v.string(),
  response: attestationResponseSchema,
  authenticatorAttachment: v.exactOptional(
    v.union([v.literal('platform'), v.literal('cross-platform')]),
  ),
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
}) satisfies v.GenericSchema<RegistrationResponseJSON>

export const creationOptionSchema = v.object({
  rp: v.object({
    id: v.exactOptional(v.string()),
    name: v.string(),
  }),
  user: v.object({
    id: v.string(),
    name: v.string(),
    displayName: v.string(),
  }),
  challenge: v.string(),
  pubKeyCredParams: v.array(
    v.object({
      alg: v.number(),
      type: v.literal('public-key'),
    }),
  ),
  timeout: v.exactOptional(v.number()),
  excludeCredentials: v.exactOptional(v.array(publicKeyDescSchema)),
}) satisfies v.GenericSchema<PublicKeyCredentialCreationOptionsJSON>

export const requestOptionSchema = v.object({
  challenge: v.string(),
  timeout: v.exactOptional(v.number()),
  rpId: v.exactOptional(v.string()),
  allowCredentials: v.exactOptional(v.array(publicKeyDescSchema)),
  userVerification: v.exactOptional(
    v.union([
      v.literal('preferred'),
      v.literal('required'),
      v.literal('discouraged'),
    ]),
  ),
  hints: v.exactOptional(
    v.array(
      v.union([
        v.literal('hybrid'),
        v.literal('security-key'),
        v.literal('client-device'),
      ]),
    ),
  ),
}) satisfies v.GenericSchema<PublicKeyCredentialRequestOptionsJSON>
