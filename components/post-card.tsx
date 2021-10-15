import Link from 'next/link'
import DateDisplay from './date'

export default function PostCard(meta: metaData) {
  return (
    <li className="mb-8 bg-gray-100 dark:bg-gray-800 rounded-md hover:shadow-lg border border-transparent dark:hover:border-gray-600 transition duration-300">
      <Link href={`/posts/${meta.date}`}>
        <a className="flex items-start px-6 py-7">
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-700 dark:text-gray-300 mb-3"><DateDisplay dateString={meta.date} /></span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{meta.title}</h2>
            <p className="text-gray-900 dark:text-gray-100 mb-2">{meta.description}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}