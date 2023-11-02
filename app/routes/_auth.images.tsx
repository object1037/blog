import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'

import { z } from 'zod'

import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'
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
    maxPartSize: 500_000,
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
  const hash = await digestMessage(imageBuffer)
  const key = `${name}-${hash}.${ext}`

  const response = await env.BUCKET.put(key, imageBuffer, {
    httpMetadata: { contentType: image.type },
  })

  return json({ response })
}
