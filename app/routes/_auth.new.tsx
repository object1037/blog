import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/cloudflare'
import { Form, useSubmit } from '@remix-run/react'

import { addPost } from '~/db.server'
import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'
import { convertFormData } from '~/utils/markdown.client'
import { parsePostData } from '~/utils/parsePostData'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(envSchema.parse(context.env))
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json({ user })
}

export default function New() {
  const submit = useSubmit()

  const defaultMarkdown = `---
id:
title:
description:
tags: []
public: false
---
`

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = await convertFormData(new FormData(e.currentTarget))
    submit(formData, { method: 'post' })
  }

  return (
    <div>
      <h2>new</h2>
      <Form method="post" onSubmit={submitHandler}>
        <textarea name="markdown" defaultValue={defaultMarkdown} />
        <button>Save</button>
      </Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const { newPost, tags } = await parsePostData(formData)

  await addPost(
    envSchema.parse(context.env).DB,
    newPost,
    tags.map((tag) => ({ name: tag })),
  )

  return redirect('/dashboard')
}
