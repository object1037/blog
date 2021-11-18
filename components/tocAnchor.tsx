import clsx from 'clsx'
import { Dispatch, memo, SetStateAction } from 'react'
import { FiChevronRight } from 'react-icons/fi'

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
    'hover:underline'
  ]
  const intersectingColorStyle = [
    'text-gray-900',
    'dark:text-gray-100',
    'border-ppink-200',
  ]
  const colorStyle = [
    'text-gray-500',
    'dark:text-gray-400',
  ]
  const anchorStyle = [
    'transition',
    '-ml-1',
    hoverStyle,
    isH2 && 'font-semibold',
    isIntersectingElement ? intersectingColorStyle : colorStyle,
  ]
  const arrowStyle = [
    'transition',
    'inline-block',
    'text-ppink-200',
    'mr-1',
    !isIntersectingElement && 'invisible'
  ]

  return (
    <>
    <a href={`#${title}`} className={clsx(anchorStyle)} onClick={setIsOpen ? () => setIsOpen(false) : undefined}>
      <FiChevronRight className={clsx(arrowStyle)} />
      <span>{title}</span>
    </a>
    </>
  )
})

export default TocAnchor