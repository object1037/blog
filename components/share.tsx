import { FaTwitter } from "react-icons/fa"
import { siteUrl } from "../constants/data"

export default function Share({
  date,
  title,
  siteTitle,
}: {
  date: string,
  title: string,
  siteTitle: string,
}) {
  return (
    <div className="flex flex-row items-center mt-12 mb-5 px-2">
      <p className="text-gray-500 dark:text-gray-400 mr-5 text-sm tracking-widest">SHARE</p>
      <a href={`https://twitter.com/share?url=${siteUrl}/posts/${date}&text=${title}｜${siteTitle}`}
        className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition" target="_blank" rel="noopener noreferrer" aria-label="Twitter Share Button">
        <p className="text-2xl"><FaTwitter /></p>
      </a>
    </div>
  )
}