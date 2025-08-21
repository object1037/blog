import { vValidator } from '@hono/valibot-validator'
import { cache } from 'hono/cache'
import { etag } from 'hono/etag'
import { HTTPException } from 'hono/http-exception'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'
import { requireAuth } from '../../middlewares/requireAuth'

type imageFileName = `${string}-${string}-${number}:${number}.webp`

export const imageFileNameRegex = /^(.+)-([^:-]+)-(\d+):(\d+)\.webp$/

export const imageFileNameSchema = v.custom<imageFileName>((input) => {
  if (typeof input !== 'string') {
    return false
  }
  return imageFileNameRegex.test(input)
})
const imageFileSchema = v.pipe(
  v.file(),
  v.mimeType(['image/webp']),
  v.maxSize(5 * 1024 * 1024), // 5MB
)

export const PUT = createRoute(
  requireAuth,
  vValidator(
    'param',
    v.object({
      file: imageFileNameSchema,
    }),
  ),
  vValidator(
    'form',
    v.object({
      file: imageFileSchema,
    }),
  ),
  async (c) => {
    const { file: fileName } = c.req.valid('param')
    const { file } = c.req.valid('form')

    const result = await c.env.BUCKET.put(fileName, file, {
      httpMetadata: {
        contentType: 'image/webp',
      },
    })

    return c.json(result)
  },
)

export const DELETE = createRoute(
  requireAuth,
  vValidator(
    'param',
    v.object({
      file: imageFileNameSchema,
    }),
  ),
  async (c) => {
    const { file } = c.req.valid('param')

    try {
      await c.env.BUCKET.delete(file)
    } catch {
      throw new HTTPException(500, { message: 'Failed to delete image' })
    }
    return c.json({ success: true })
  },
)

export default createRoute(
  vValidator(
    'param',
    v.object({
      file: imageFileNameSchema,
    }),
  ),
  etag(),
  cache({
    cacheName: 'image-cache',
    cacheControl: 'public, max-age=14400, s-maxage=86400',
  }),
  async (c) => {
    const { file } = c.req.valid('param')

    const object = await c.env.BUCKET.get(file)
    if (!object) {
      return c.notFound()
    }

    return c.body(object.body, 200, {
      'Content-Type': object.httpMetadata?.contentType ?? 'image/webp',
      ETag: object.httpEtag,
    })
  },
)
