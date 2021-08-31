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
  const intersectingColorStyle = [
    'text-gray-900',
    'dark:text-gray-100',
  ]
  const h2ColorStyle = [
    'text-gray-500',
    'dark:text-gray-400',
  ]
  const h3ColorStyle = [
    'text-gray-400',
    'dark:text-gray-500',
  ]
  const colorStyle = isH2 ? h2ColorStyle : h3ColorStyle
  return (
    <a href={`#${title}`} className={clsx(
      'transition',
      hoverStyle,
      isH2 && 'font-semibold',
      isIntersectingElement ? intersectingColorStyle : colorStyle,
    )}>
      {title}
    </a>
  )
})

export default TocAnchor