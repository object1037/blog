import { rgbaToThumbHash } from 'thumbhash'

const loadImg = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(img.src)
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}
const loadWebp = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create WebP blob'))
        }
      },
      'image/webp',
      0.75,
    )
  })
}

const getThumbHash = async (
  canvas: HTMLCanvasElement,
  blob: Blob,
  w: number,
  h: number,
) => {
  const ctx = canvas.getContext('2d')
  const img = await loadImg(URL.createObjectURL(blob))

  if (!ctx) {
    return
  }
  ctx.reset()
  canvas.width = w
  canvas.height = h
  ctx.drawImage(img, 0, 0, w, h)
  const pixels = ctx.getImageData(0, 0, w, h)
  const hash = rgbaToThumbHash(w, h, pixels.data)
  const thumbBase64 = btoa(String.fromCharCode(...hash)).replace(/=+$/, '')

  return thumbBase64
}

export const convertToWebp = async (file: File) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = await loadImg(URL.createObjectURL(file))

  if (!ctx) {
    return
  }
  const width = img.naturalWidth
  const height = img.naturalHeight
  const size = Math.max(width, height)
  const w = Math.round((100 * width) / size)
  const h = Math.round((100 * height) / size)

  canvas.width = width
  canvas.height = height
  ctx.drawImage(img, 0, 0, width, height)

  const webpBlob = await loadWebp(canvas)
  const thumbhash = await getThumbHash(canvas, webpBlob, w, h)
  const fileName = `${file.name.replace(/\.[^/.]+$/, '')}-${thumbhash}-${width}:${height}.webp`
  const webp = new File([webpBlob], fileName, { type: 'image/webp' })

  return webp
}
