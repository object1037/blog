import Link from 'next/link'

export default function Tag({
  name
}: {
  name: string
}) {
  return (
    <Link href={`/tags/${name}`}>
      <a className="bg-gray-200 dark:bg-gray-700 px-4 py-2 m-2 rounded-md">
        # {name}
      </a>
    </Link>
  )
}