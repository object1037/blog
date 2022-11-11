import Link from 'next/link'
import clsx from 'clsx'
import { FiHash } from 'react-icons/fi'

export default function Tag({
  name,
  postsCount,
}: {
  name: string
  postsCount?: number
}) {
  return (
    <Link href={`/tags/${name}`}>
      <div
        className={clsx(
          'px-4',
          'py-2.5',
          'flex',
          'items-center',
          'bg-ngray-100',
          'dark:bg-ngray-800',
          'hover:bg-ngray-200',
          'dark:hover:bg-ngray-700',
          'transition',
          'rounded-lg',
          'flex',
          'flex-row',
          'm-2',
          'rounded-lg'
        )}
      >
        <span
          className={clsx(
            'inline-flex',
            'flex-row',
            'items-center',
            'py-0.5',
            postsCount &&
              'border-r border-ngray-300 dark:border-ngray-600 pr-4 mr-4'
          )}
        >
          <FiHash className="inline-block mr-1" />
          <span className="capsizedText">{name}</span>
        </span>
        {postsCount && (
          <span className="text-ngray-500 text-sm capsizedText">
            {postsCount}
          </span>
        )}
      </div>
    </Link>
  )
}
