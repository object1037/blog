import Link from 'next/link'
import clsx from 'clsx'

export default function Tag({
  name,
  postsCount
}: {
  name: string,
  postsCount?: number
}) {
  return (
    <Link href={`/tags/${name}`}>
      <a className="flex flex-row group m-2 rounded-md">
        <div className={clsx(
          'px-4',
          'py-2',
          'bg-gray-100',
          'dark:bg-gray-800',
          'group-hover:bg-gray-200',
          'dark:group-hover:bg-gray-700',
          'transition',
          'rounded-l-md',
          !postsCount && 'rounded-r-md'
        )}># {name}</div>
        {postsCount && <div className="flex items-center text-center bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 px-4 rounded-r-md transition">{postsCount}</div>}
      </a>
    </Link>
  )
}