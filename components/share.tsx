import { FaTwitter } from "react-icons/fa"

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
    <div className="flex flex-row-reverse mt-12 mb-6">
      <a href={`https://twitter.com/share?url=https://blog.object1037.dev/posts/${date}&text=${title}｜${siteTitle}`}
        className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition" target="_blank" rel="noopener noreferrer" aria-label="Twitter Share Button">
        <p className="text-2xl"><FaTwitter /></p>
      </a>
    </div>
  )
}