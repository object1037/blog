import Link from 'next/link'
import Date from './date'

interface props {
  idN: number;
  title: string;
  description: string;
}

export default function PostCard(props: props) {
  return (
    <Link href={`/posts/${props.idN}`}>
      <a className="flex flex-col h-32 p-4">
        <span className="text-xs text-gray-800 dark:text-gray-200"><Date dateString={String(props.idN)} /></span>
        <span className="text-xl mb-4 text-gray-900 dark:text-gray-100">{props.title}</span>
        <span className="truncate text-gray-900 dark:text-gray-100">{props.description}</span>
      </a>
    </Link>
  )
}