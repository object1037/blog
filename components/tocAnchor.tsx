export default function TocAnchor({
  title,
  isH2
}: {
  title: string,
  isH2?: boolean
}) {
  if (isH2) {
    return (
      <a href={`#${title}`} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline font-semibold">{title}</a>
    )
  } else {
    return (
      <a href={`#${title}`} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline">{title}</a>
    )
  }
}