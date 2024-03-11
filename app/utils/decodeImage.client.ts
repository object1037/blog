import JPEG_DEC_WASM from '@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm?url'
import decodeJpeg, { init as initJpegWasm } from '@jsquash/jpeg/decode'
import PNG_DEC_WASM from '@jsquash/png/codec/pkg/squoosh_png_bg.wasm?url'
import decodePng, { init as initPngWasm } from '@jsquash/png/decode'

export const decodeImage = async (buffer: ArrayBuffer, format: string) => {
  if (format === 'jpeg' || format === 'jpg') {
    await initJpegWasm(
      await fetch(JPEG_DEC_WASM)
        .then((response) => response.arrayBuffer())
        .then((bytes) => new WebAssembly.Module(bytes)),
    )
    return decodeJpeg(buffer)
  } else if (format === 'png') {
    await initPngWasm(PNG_DEC_WASM)
    return decodePng(buffer)
  }

  throw new Response(`Unsupported format: ${format}`, { status: 400 })
}
