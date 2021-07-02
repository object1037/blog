import clsx from 'clsx'

export default function TocAnchor({
  title,
  isH2
}: {
  title: string,
  isH2?: boolean
}) {
  return (
    <a href={`#${title}`} className={clsx(
      'text-gray-500', 
      'dark:text-gray-400', 
      'hover:text-gray-900', 
      'dark:hover:text-gray-100', 
      'hover:underline', 
      isH2 && 'font-semibold'
      )}>{title}</a>
  )
}