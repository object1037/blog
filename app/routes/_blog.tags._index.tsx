import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react'

import { ContainerWithHeading } from '~/components/containerWithHeading'
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
          <li key={tag}>
            <Link to={`${tag}`} prefetch="intent">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </ContainerWithHeading>
  )
}