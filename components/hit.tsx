import clsx from 'clsx'
import Link from 'next/link'

export default function Hit({
  hit
}: {
  hit: {
    objectID: string
    title: string
    description: string
    content: string
  }
}) {
  const cardStyle = [
    'mb-8',
    'bg-gray-100',
    'dark:bg-gray-800',
    'rounded-md',
    'hover:bg-gray-200',
    'border',
    'border-transparent',
    'dark:hover:border-gray-600',
    'transition',
    'px-6',
    'py-7'
  ]
  return (
    <>
    <Link href={`/posts/${hit.objectID}`}>
      <a className={clsx(cardStyle)}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{hit.title}</h2>
        <p className="text-gray-900 dark:text-gray-100 mb-2">{hit.description}</p>
      </a>
    </Link>
    </>
  )
}