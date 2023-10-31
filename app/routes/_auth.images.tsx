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
          <li key={object.key}>{object.key}</li>
        ))}
      </ul>
      <Form method="post" encType="multipart/form-data">
        <input type="file" name="image" />
        <button>Submit</button>
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
  const image = z.instanceof(File).parse(formData.get('image'))
  const response = await env.BUCKET.put(image.name, await image.arrayBuffer(), {
    httpMetadata: { contentType: image.type },
  })

  return json({ response })
}
