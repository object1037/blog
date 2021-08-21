import clsx from 'clsx'
import { memo } from 'react'

const TocAnchor = memo(function TocAnchor({
  title,
  isH2,
  isIntersectingElement,
}: {
  title: string,
  isH2?: boolean,
  isIntersectingElement: boolean,
}) {
  const hoverStyle = [
    'hover:text-gray-900',
    'dark:hover:text-gray-100',
    'hover:underline',
  ]
  const intersectingStyle = [
    'text-gray-900',
    'dark:text-gray-100',
  ]
  return (
    <a href={`#${title}`} className={clsx(
      'text-gray-500',
      hoverStyle,
      isH2 && 'font-semibold',
      isIntersectingElement && intersectingStyle,
      !isIntersectingElement && 'dark:text-gray-400'
      )}>{title}</a>
  )
})

export default TocAnchor