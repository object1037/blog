import resize, { initResize } from '@jsquash/resize'
import RESIZE_WASM from '@jsquash/resize/lib/resize/squoosh_resize_bg.wasm'

export const resizeImage = async (
  data: ImageData,
  option: {
    width: number
    height: number
  },
) => {
  await initResize(RESIZE_WASM)
  return resize(data, option)
}
