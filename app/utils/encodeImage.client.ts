import WEBP_ENC_WASM from '@jsquash/webp/codec/enc/webp_enc.wasm'
import encodeWebp, { init as initWebpWasm } from '@jsquash/webp/encode'

export const encodeImage = async (imageData: ImageData) => {
  await initWebpWasm(WEBP_ENC_WASM)
  const webpImage = await encodeWebp(imageData)
  return webpImage
}
