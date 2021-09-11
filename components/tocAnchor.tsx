import clsx from 'clsx'
import { Dispatch, memo, SetStateAction } from 'react'

const TocAnchor = memo(function TocAnchor({
  title,
  isH2,
  isIntersectingElement,
  setIsOpen
}: {
  title: string,
  isH2?: boolean,
  isIntersectingElement: boolean,
  setIsOpen?: Dispatch<SetStateAction<boolean>>
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
  const colorStyle = [
    'text-gray-500',
    'dark:text-gray-400',
  ]
  const anchorStyle = [
    'transition',
    hoverStyle,
    isH2 && 'font-semibold',
    isIntersectingElement ? intersectingColorStyle : colorStyle,
  ]
  return (
    <a href={`#${title}`} className={clsx(anchorStyle)} onClick={setIsOpen ? () => setIsOpen(false) : undefined}>
      {title}
    </a>
  )
})

export default TocAnchor