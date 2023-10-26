import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { ContainerWithHeading } from '~/components/containerWithHeading'
import { TagList } from '~/components/tagList'
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
      <TagList tags={tags} />
    </ContainerWithHeading>
  )
}
