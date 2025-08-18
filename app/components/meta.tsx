export const Meta = ({
  title,
  description,
  url,
  type = 'website',
}: {
  title: string
  description?: string
  url?: string
  type?: 'website' | 'article'
}) => {
  return (
    <>
      <title>
        {title === ''
          ? 'ゆるふわインターネット'
          : `${title} | ゆるふわインターネット`}
      </title>
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <link rel="canonical" href={url} />
    </>
  )
}
