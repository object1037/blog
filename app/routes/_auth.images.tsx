import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
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
  const submit = useSubmit()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const image = formData.get('image')

    if (!(image instanceof File)) {
      throw new Error('Invalid image')
    }

    const imageBuffer = await image.arrayBuffer()
    const [name, ext] = image.name.split('.')

    if (!(name && ext)) {
      throw new Error('Invalid image extension')
    }

    const imageData = await decodeImage(imageBuffer, ext)
    const webpImage = await encodeImage(imageData)

    formData.set('webp', new File([webpImage], `${name}.webp`))
    formData.set('_action', 'add')

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
              <button name="_action" value="delete">
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
        <button>Add</button>
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

  const origImage = z.instanceof(File).parse(formData.get('image'))
  const webpImage = z.instanceof(File).parse(formData.get('webp'))
  const origBuffer = await origImage.arrayBuffer()
  const webpBuffer = await webpImage.arrayBuffer()

  const [name, ext] = origImage.name.split('.')
  const hash = await digestMessage(origBuffer)
  const fileName = `${name}-${hash}`

  const response = await Promise.all([
    env.BUCKET.put(`${fileName}.${ext}`, origBuffer, {
      httpMetadata: { contentType: origImage.type },
    }),
    env.BUCKET.put(`${fileName}.webp`, webpBuffer, {
      httpMetadata: { contentType: 'image/webp' },
    }),
  ])

  return json({ response })
}
