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
          'bg-ngray-100',
          'dark:bg-ngray-800',
          'group-hover:bg-ngray-200',
          'dark:group-hover:bg-ngray-700',
          'transition',
          'rounded-md',
        )}>
          <span className="inline-flex flex-row items-center">
            <FiHash className="inline-block mr-1"/>
            {name}
          </span>
          {postsCount && 
            <span className='text-ngray-500 text-sm border-l border-ngray-300 dark:border-ngray-600 ml-4 pl-4'>
              {postsCount}
            </span>
          }
        </div>
      </a>
    </Link>
  )
}