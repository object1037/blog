import { bufferToBase64URLString } from '@simplewebauthn/browser'
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
  const thumbBase64 = bufferToBase64URLString(
    new Uint8Array(hash).buffer,
  ).replace(/-/g, '.')

  return thumbBase64
}

export const convertToWebp = async (file: File) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = await loadImg(URL.createObjectURL(file))

  if (!ctx) {
    return
  }
  const { width, height } = limitImageDimensions(img, 3840)
  const { width: w, height: h } = limitImageDimensions(img, 100)

  canvas.width = width
  canvas.height = height
  ctx.drawImage(img, 0, 0, width, height)

  const webpBlob = await loadWebp(canvas)
  const thumbhash = await getThumbHash(canvas, webpBlob, w, h)
  const fileName = `${file.name.replace(/\.[^/.]+$/, '')}-${thumbhash}-${width}:${height}.webp`
  const webp = new File([webpBlob], fileName, { type: 'image/webp' })

  return webp
}

const limitImageDimensions = (img: HTMLImageElement, maxSize: number) => {
  const originalWidth = img.naturalWidth
  const originalHeight = img.naturalHeight
  const size = Math.max(originalWidth, originalHeight)

  if (originalWidth <= maxSize && originalHeight <= maxSize) {
    return {
      width: originalWidth,
      height: originalHeight,
    }
  }

  return {
    width: Math.round((maxSize * originalWidth) / size),
    height: Math.round((maxSize * originalHeight) / size),
  }
}
