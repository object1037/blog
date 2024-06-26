import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/cloudflare'
import { Form, useLoaderData, useSubmit } from '@remix-run/react'

import { z } from 'zod'

import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'
import { decodeImage } from '~/utils/decodeImage.client'
import { digestMessage } from '~/utils/digest'
import { encodeImage } from '~/utils/encodeImage.client'
import { resizeImage } from '~/utils/resizeImage.client'

export const meta: MetaFunction = () => [{ title: 'Blog Images' }]

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(
    envSchema.parse(context.cloudflare.env),
  )
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const list = await envSchema.parse(context.cloudflare.env).BUCKET.list()

  return json({ list })
}

export default function Images() {
  const { list } = useLoaderData<typeof loader>()
  const submit = useSubmit()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const image = formData.get('image')

    if (!(image instanceof File)) {
      throw new Error('Invalid image')
    }

    const imageBuffer = await image.arrayBuffer()
    const extIdx = image.name.lastIndexOf('.')
    const name = image.name.slice(0, extIdx).replace(/\.|-|\s/g, '')
    const ext = image.name.slice(extIdx + 1)

    if (!(name && ext)) {
      throw new Error('Invalid file name')
    }

    const origImage = await decodeImage(imageBuffer, ext)

    const origWidth = origImage.width
    const origHeight = origImage.height
    let width = origWidth
    let height = origHeight
    const aspect = origHeight / origWidth

    if (origWidth > origHeight && origWidth > 3840) {
      width = 3840
      height = Math.round(aspect * 3840)
    } else if (origHeight > origWidth && origHeight > 3840) {
      width = Math.round(3840 / aspect)
      height = 3840
    }

    const resizedImage = await resizeImage(origImage, {
      width,
      height,
    })

    const webpImage = await encodeImage(resizedImage)

    formData.set(
      'image',
      new File([imageBuffer], `${name}.${ext}`, { type: image.type }),
    )
    formData.set(
      'webp',
      new File([webpImage], `${name}.webp`, { type: 'image/webp' }),
    )
    formData.set('_action', 'add')
    formData.set('width', width.toString())
    formData.set('height', height.toString())

    submit(formData, { method: 'post', encType: 'multipart/form-data' })
  }

  return (
    <div>
      <ul>
        {list.objects.map((object) => (
          <li key={object.key}>
            <a href={`/images/${object.key}`}>{object.key}</a>
            <Form method="post" encType="multipart/form-data">
              <input type="hidden" name="key" value={object.key} />
              <button type="submit" name="_action" value="delete">
                Delete
              </button>
            </Form>
          </li>
        ))}
      </ul>
      <Form
        method="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <input type="file" name="image" />
        <button type="submit">Add</button>
      </Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 10_000_000,
  })

  const formData = await unstable_parseMultipartFormData(request, uploadHandler)
  const _action = z.string().parse(formData.get('_action'))

  if (_action === 'delete') {
    const key = z.string().parse(formData.get('key'))
    await env.BUCKET.delete(key)
    return null
  }

  const origImage = z.instanceof(File).parse(formData.get('image'))
  const webpImage = z.instanceof(File).parse(formData.get('webp'))
  const origBuffer = await origImage.arrayBuffer()
  const webpBuffer = await webpImage.arrayBuffer()

  const width = z.string().parse(formData.get('width'))
  const height = z.string().parse(formData.get('height'))

  const [name, ext] = origImage.name.split('.')
  const hash = await digestMessage(origBuffer)
  const fileName = `${name}-${hash}-${width}:${height}`

  const response = await Promise.all([
    env.BUCKET.put(`${fileName}.${ext}`, origBuffer, {
      httpMetadata: { contentType: origImage.type },
    }),
    env.BUCKET.put(`${fileName}.webp`, webpBuffer, {
      httpMetadata: { contentType: webpImage.type },
    }),
  ])

  return json({ response })
}
