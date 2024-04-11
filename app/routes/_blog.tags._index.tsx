import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getTags } from '~/.server/db'
import { ContainerWithHeading } from '~/components/containerWithHeading'
import { TagList } from '~/components/tagList'
import { envSchema } from '~/env'

export const meta: MetaFunction = () => [
  { title: 'Tags | ゆるふわインターネット' },
]

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = envSchema.parse(context.cloudflare.env)
  const tagDatas = await getTags(env.DB)

  const cacheControl =
    'public, max-age=30, stale-while-revalidate=600, stale-if-error=864000'

  return json({ tagDatas }, { headers: { 'Cache-Control': cacheControl } })
}

export default function Tags() {
  const { tagDatas } = useLoaderData<typeof loader>()

  return (
    <ContainerWithHeading heading="Tags">
      <TagList tagDatas={tagDatas} />
    </ContainerWithHeading>
  )
}
