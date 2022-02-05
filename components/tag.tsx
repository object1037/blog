import Link from 'next/link'
import clsx from 'clsx'
import { FiHash } from 'react-icons/fi'

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
          'flex',
          'items-center',
          'bg-gray-100',
          'dark:bg-gray-800',
          'group-hover:bg-gray-200',
          'dark:group-hover:bg-gray-700',
          'transition',
          'rounded-l-md',
          !postsCount && 'rounded-r-md'
        )}>
          <span className="inline-flex flex-row items-center">
            <FiHash className="inline-block mr-1"/>
            {name}
          </span>
        </div>
        {postsCount && <div className="flex items-center text-center bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 px-4 rounded-r-md transition">{postsCount}</div>}
      </a>
    </Link>
  )
}