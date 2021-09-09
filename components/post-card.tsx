import Link from 'next/link'
import DateDisplay from './date'

export default function PostCard(meta: metaData) {
  return (
    <li className="mb-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg border border-transparent dark:hover:border-gray-600 transition">
      <Link href={`/posts/${meta.date}`}>
        <a className="flex items-start p-4">
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-700 dark:text-gray-300 mb-3"><DateDisplay dateString={meta.date} /></span>
            <h2 className="truncate text-xl text-gray-900 dark:text-gray-100 mb-4">{meta.title}</h2>
            <p className="truncate text-gray-900 dark:text-gray-100 mb-2">{meta.description}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}