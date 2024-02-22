import WEBP_ENC_WASM from '@jsquash/webp/codec/enc/webp_enc.wasm?url'
import encodeWebp, { init as initWebpWasm } from '@jsquash/webp/encode'

export const encodeImage = async (imageData: ImageData) => {
  await initWebpWasm(
    await fetch(WEBP_ENC_WASM)
      .then((response) => response.arrayBuffer())
      .then((bytes) => new WebAssembly.Module(bytes)),
  )
  const webpImage = await encodeWebp(imageData)
  return webpImage
}
