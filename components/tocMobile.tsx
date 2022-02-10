import TocAnchor from "./tocAnchor"
import { useState } from "react"
import { FiList, FiX } from 'react-icons/fi'
import clsx from "clsx"

export default function ToCMobile({
  tocElements,
  intersectingElementId,
}: {
  tocElements: tocElement[],
  intersectingElementId: string,
}) {
  const [isOpen, setIsOpen] = useState(false)
  function openMenu() {
    setIsOpen(true)
  }
  function closeMenu() {
    setIsOpen(false)
  }

  const iconStyle = [
    'absolute',
    'left-1/2',
    'top-1/2',
    '-mt-3',
    '-ml-3',
    'transition',
    'duration-200',
    'transform',
  ]
  const fadeOutStyle = [
    'scale-80',
    'opacity-0',
  ]
  const menuWrapperStyle = [
    'z-10',
    'flex',
    'lg:hidden',
    'fixed',
    'pr-8',
    'pl-4',
    'pt-6',
    'pb-16',
    'inset-0',
  ]
  const menuStyle = [
    'flex-grow',
    'max-h-full',
    'overflow-y-auto',
    'overflow-hidden',
    'max-w-sm',
    'rounded-md',
    'border',
    'border-ngray-300',
    'dark:border-ngray-600',
    'ml-auto',
    'mt-auto',
    'text-sm',
    'leading-loose',
    'shadow-2xl',
    'bg-white',
    'dark:bg-ngray-900',
  ]

  return (
    <>
    <button aria-label="目次" className="z-20 fixed bottom-12 right-4 ml-auto shadow-lg block lg:hidden text-ngray-100 dark:text-ngray-900 bg-ngray-900 dark:bg-ngray-100 rounded-full w-16 h-16" onClick={isOpen ? () => closeMenu() : () => openMenu()}>
      <span className="text-2xl">
        <FiList className={clsx(iconStyle, isOpen && fadeOutStyle)} />
        <FiX className={clsx(iconStyle, !isOpen && fadeOutStyle)} />
      </span>
    </button>
    {isOpen && (
      <aside className={clsx(menuWrapperStyle)} onClick={() => closeMenu()}>
        <nav className={clsx(menuStyle)}>
          <ol className="shadow-2xl bg-white dark:bg-ngray-900 p-4">
            {tocElements.map((element) => {
              let isIntersectingElement = false
              if (element.title === intersectingElementId) {
                isIntersectingElement = true
              }

              if (element.childEls.length > 0) {
                return (
                  <li key={element.scrollPos} className="truncate">
                    <TocAnchor title={element.title} isH2 isIntersectingElement={isIntersectingElement} setIsOpen={setIsOpen} />
                    <ol className="ml-3">
                      {element.childEls.map((childEl) => {
                        let isIntersectingChildElement = false
                        if (childEl.title === intersectingElementId) {
                          isIntersectingChildElement = true
                        }

                        return (
                          <li key={childEl.scrollPos} className="truncate">
                            <TocAnchor title={childEl.title} isIntersectingElement={isIntersectingChildElement} setIsOpen={setIsOpen} />
                          </li>
                        )
                      })}
                    </ol>
                  </li>
                )
              } else if (element.childEls.length === 0) {
                return (
                  <li key={element.scrollPos} className="truncate">
                    <TocAnchor title={element.title} isH2 isIntersectingElement={isIntersectingElement} setIsOpen={setIsOpen} />
                  </li>
                )
              }
            })}
          </ol>
        </nav>
      </aside>
    )}
    </>
  )
}