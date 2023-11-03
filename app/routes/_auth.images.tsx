import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'

import WEBP_ENC_WASM from '@jsquash/webp/codec/enc/webp_enc_simd.wasm'
import encodeWebp, { init as initWebpWasm } from '@jsquash/webp/encode'
import { z } from 'zod'

import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'
import { decodeImage } from '~/utils/decodeImage'
import { digestMessage } from '~/utils/digest'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(envSchema.parse(context.env))
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const list = await envSchema.parse(context.env).BUCKET.list()

  return json({ list })
}

export default function Images() {
  const { list } = useLoaderData<typeof loader>()

  return (
    <div>
      <ul>
        {list.objects.map((object) => (
          <li key={object.key}>
            <a href={`/images/${object.key}`}>{object.key}</a>
            <Form method="post" encType="multipart/form-data">
              <input type="hidden" name="key" value={object.key} />
              <button name="_action" value="delete">
                Delete
              </button>
            </Form>
          </li>
        ))}
      </ul>
      <Form method="post" encType="multipart/form-data">
        <input type="file" name="image" />
        <button name="_action" value="add">
          Add
        </button>
      </Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 1_000_000,
  })

  const formData = await unstable_parseMultipartFormData(request, uploadHandler)
  const _action = z.string().parse(formData.get('_action'))

  if (_action === 'delete') {
    const key = z.string().parse(formData.get('key'))
    await env.BUCKET.delete(key)
    return null
  }

  const image = z.instanceof(File).parse(formData.get('image'))
  const imageBuffer = await image.arrayBuffer()

  const [name, ext] = image.name.split('.')
  if (!name || !ext) {
    throw new Response(`Invalid image name: ${image.name}`, { status: 400 })
  }
  const hash = await digestMessage(imageBuffer)
  const fileName = `${name}-${hash}`

  const imageData = await decodeImage(imageBuffer, ext)
  await initWebpWasm(WEBP_ENC_WASM)
  const webpImage = await encodeWebp(imageData)

  const response = await Promise.all([
    env.BUCKET.put(`${fileName}.${ext}`, imageBuffer, {
      httpMetadata: { contentType: image.type },
    }),
    env.BUCKET.put(`${fileName}.webp`, webpImage, {
      httpMetadata: { contentType: 'image/webp' },
    }),
  ])

  return json({ response })
}
