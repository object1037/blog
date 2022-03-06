import Link from 'next/link'
import DateDisplay from './date'

export default function PostCard(post: postData) {
  return (
    <li className="mb-8 bg-ngray-100 dark:bg-ngray-800 rounded-md border border-transparent hover:border-ngray-300 dark:hover:border-ngray-600 transition">
      <Link href={`/posts/${post.date}`}>
        <a className="flex items-start px-6 py-7">
          <div className="flex flex-col w-full">
            <span className="text-xs text-ngray-700 dark:text-ngray-300 mb-3"><DateDisplay dateString={post.date} /></span>
            <h2 className="text-xl font-semibold text-ngray-900 dark:text-ngray-100 mb-4">{post.title}</h2>
            <p className="text-ngray-900 dark:text-ngray-100 mb-2">{post.description}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}