import { vValidator } from '@hono/valibot-validator'
import { createRoute } from 'honox/factory'
import * as v from 'valibot'

type imageFileName = `${string}-${string}-${number}:${number}.webp`

const imageFileNameSchema = v.custom<imageFileName>((input) => {
  if (typeof input !== 'string') {
    return false
  }
  return /^(.+)-([^:-]+)-(\d+):(\d+)\.webp$/.test(input)
})
const imageFileSchema = v.pipe(
  v.file(),
  v.mimeType(['image/webp']),
  v.maxSize(5 * 1024 * 1024), // 5MB
)

export const POST = createRoute(
  vValidator(
    'param',
    v.object({
      file: v.string(),
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

export default createRoute(
  vValidator(
    'param',
    v.object({
      file: imageFileNameSchema,
    }),
  ),
  async (c) => {
    const { file } = c.req.valid('param')

    const object = await c.env.BUCKET.get(file)
    if (!object) {
      return c.notFound()
    }

    return c.body(object.body, 200, {
      'Content-Type': 'image/webp',
      ETag: object.httpEtag,
    })
  },
)
