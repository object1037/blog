import { useCallback, useState } from 'react'

import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
  redirect,
} from '@remix-run/cloudflare'
import { useFetcher } from '@remix-run/react'

import { ClientOnly } from 'remix-utils/client-only'

import { addPost } from '~/.server/db'
import { Editor } from '~/components/editor.client'
import { envSchema } from '~/env'
import { getAuthenticator } from '~/services/auth.server'
import { convertMarkdown } from '~/utils/markdown.client'
import { parsePostData } from '~/utils/parsePostData'

export const meta: MetaFunction = () => [{ title: 'New Post' }]

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(
    envSchema.parse(context.cloudflare.env),
  )
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json({ user })
}

export default function New() {
  const defaultMarkdown = `---
id:
title:
description:
tags: []
public: false
---
`

  const fetcher = useFetcher()
  const [markdown, setMarkdown] = useState(defaultMarkdown)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { frontmatter, html } = await convertMarkdown(markdown)
    fetcher.submit(
      {
        frontmatter: JSON.stringify(frontmatter),
        markdown,
        html,
      },
      { method: 'post' },
    )
  }
  const onChange = useCallback((value: string) => {
    setMarkdown(value)
  }, [])

  return (
    <div>
      <ClientOnly fallback={<textarea readOnly value={markdown} />}>
        {() => <Editor value={markdown} onChange={onChange} />}
      </ClientOnly>
      <fetcher.Form onSubmit={submitHandler}>
        <button type="submit">Save</button>
      </fetcher.Form>
    </div>
  )
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const { newPost, tags } = await parsePostData(formData)

  await addPost(
    envSchema.parse(context.cloudflare.env).DB,
    newPost,
    tags.map((tag) => ({ name: tag })),
  )

  return redirect('/dashboard')
}
