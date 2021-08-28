import Link from 'next/link'
import DateDisplay from './date'

export default function PostCard(meta: metaData) {
  return (
    <li className="my-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg border border-transparent dark:hover:border-gray-600 transition">
      <Link href={`/posts/${meta.date}`}>
        <a className="flex flex-col h-32 px-4 py-3">
          <span className="text-xs text-gray-700 dark:text-gray-300 mb-2"><DateDisplay dateString={meta.date} /></span>
          <span className="truncate text-xl mb-4 text-gray-900 dark:text-gray-100">{meta.title}</span>
          <span className="truncate text-gray-900 dark:text-gray-100">{meta.description}</span>
        </a>
      </Link>
    </li>
  )
}