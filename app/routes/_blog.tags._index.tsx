import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'

import { ContainerWithHeading } from '~/components/containerWithHeading'
import { Tag } from '~/components/tag'
import { getTags } from '~/db.server'
import { envSchema } from '~/env'

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.env)
  const tags = await getTags(env.DB)

  return json({ tags })
}

export default function Tags() {
  const { tags } = useLoaderData<typeof loader>()

  return (
    <ContainerWithHeading heading="Tags">
      <ul>
        {tags.map((tag) => (
          <li key={tag} className={css({ display: 'inline' })}>
            <Tag name={tag} />
          </li>
        ))}
      </ul>
    </ContainerWithHeading>
  )
}
