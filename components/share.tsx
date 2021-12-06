import { FiTwitter, FiCopy } from "react-icons/fi"
import { siteUrl } from "../constants/data"
import clsx from "clsx"

export default function Share({
  date,
  title,
  siteTitle,
}: {
  date: string,
  title: string,
  siteTitle: string,
}) {
  const clickHandler = (url: string) => {
    navigator.clipboard.writeText(url)
  }
  const shareStyle = [
    'text-gray-500',
    'hover:text-gray-900',
    'dark:text-gray-400',
    'dark:hover:text-gray-100',
    'transition',
  ]

  return (
    <div className="flex flex-row items-center mt-12 mb-5 px-2">
      <p className="text-gray-500 dark:text-gray-400 mr-6 text-sm tracking-widest">SHARE</p>
      <div className="flex justify-start space-x-4">
        <a href={`https://twitter.com/share?url=${siteUrl}/posts/${date}&text=${title}｜${siteTitle}`}
          className={clsx(shareStyle)} target="_blank" rel="noopener noreferrer" aria-label="Twitter Share Button">
          <span className="text-xl"><FiTwitter /></span>
        </a>
        <div className={clsx(shareStyle, 'cursor-pointer')} onClick={() => clickHandler(`${siteUrl}/posts/${date}`)} aria-label="URLをコピーする">
          <span className="text-xl"><FiCopy /></span>
        </div>
      </div>
    </div>
  )
}