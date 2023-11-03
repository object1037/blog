import JPEG_DEC_WASM from '@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm'
import decodeJpeg, { init as initJpegWasm } from '@jsquash/jpeg/decode'
import PNG_DEC_WASM from '@jsquash/png/codec/squoosh_png_bg.wasm'
import decodePng, { init as initPngWasm } from '@jsquash/png/decode'

export const decodeImage = async (buffer: ArrayBuffer, format: string) => {
  if (format === 'jpeg' || format === 'jpg') {
    await initJpegWasm(JPEG_DEC_WASM)
    return decodeJpeg(buffer)
  } else if (format === 'png') {
    await initPngWasm(PNG_DEC_WASM)
    return decodePng(buffer)
  }

  throw new Response(`Unsupported format: ${format}`, { status: 400 })
}
