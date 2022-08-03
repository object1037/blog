import { FiTwitter, FiCopy, FiCheck } from "react-icons/fi"
import { siteUrl } from "../constants/data"
import clsx from "clsx"
import { useState } from "react"

export default function Share({
  date,
  title,
  siteTitle,
}: {
  date: string,
  title: string,
  siteTitle: string,
}) {
  const [copied, setCopied] = useState(false)

  const clickHandler = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2500)
    })
  }
  const shareStyle = [
    'p-1.5',
    'text-ngray-500',
    'hover:text-black',
    'dark:text-ngray-400',
    'dark:hover:text-white',
    'transition',
  ]

  return (
    <div className="flex flex-row items-center px-2 py-3.5 mt-12 border-t border-ngray-300 dark:border-ngray-600">
      <p className="text-ngray-500 dark:text-ngray-400 mr-5 text-sm tracking-widest">SHARE</p>
      <div className="flex justify-start space-x-1.5">
        <a href={`https://twitter.com/share?url=${siteUrl}/posts/${date}&text=${title}｜${siteTitle}`}
          className={clsx(shareStyle)} target="_blank" rel="noopener noreferrer" aria-label="Twitter Share Button">
          <span className="text-xl"><FiTwitter /></span>
        </a>
        <button
          className={clsx(shareStyle)}
          onClick={() => clickHandler(`${title} | ${siteTitle}\n${siteUrl}/posts/${date}`)}
          aria-label="Copy URL"
        >
          <span className="text-xl">
            <FiCopy className={clsx(copied && 'hidden')} />
            <FiCheck className={clsx(!copied && 'hidden')} />
          </span>
        </button>
      </div>
    </div>
  )
}