import Link from 'next/link'
import Date from './date'

interface postData {
  id: number;
  title: string;
  description: string;
}

export default function PostCard(postData: postData) {
  return (
    <li className="my-3 bg-gray-100 dark:bg-gray-800 rounded-sm shadow-sm hover:shadow-lg h-30">
      <Link href={`/posts/${postData.id}`}>
        <a className="flex flex-col h-32 p-4">
          <span className="text-xs text-gray-800 dark:text-gray-200"><Date dateString={String(postData.id)} /></span>
          <span className="text-xl mb-4 text-gray-900 dark:text-gray-100">{postData.title}</span>
          <span className="truncate text-gray-900 dark:text-gray-100">{postData.description}</span>
        </a>
      </Link>
    </li>
  )
}