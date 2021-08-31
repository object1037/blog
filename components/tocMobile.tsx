import TocAnchor from "./tocAnchor"
import { useState } from "react"
import { FiList, FiChevronDown } from 'react-icons/fi'

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

  if (!isOpen) {
    return (
      <div className="bg-white dark:bg-gray-900 py-3 px-6 flex justify-end sticky top-0">
        <button onClick={() => openMenu()}>
          <span className="text-2xl flex space-x-1">
            <FiList />
            <FiChevronDown className="transition" />
          </span>
        </button>
      </div>
    )
  }
  return (
    <div className="bg-white dark:bg-gray-900 py-3 px-6 flex justify-end sticky top-0">
      <button onClick={() => closeMenu()}>
        <span className="text-2xl flex space-x-1">
          <FiList />
          <FiChevronDown className="transform rotate-180 transition" />
        </span>
      </button>
      <nav className="absolute left-6 right-6 top-10 ml-auto leading-loose text-sm max-w-sm">
        <ol className="border border-gray-300 dark:border-gray-600 shadow-2xl bg-white dark:bg-gray-900 rounded-md p-4">
          {tocElements.map((element) => {
            let isIntersectingElement = false
            if (element.title === intersectingElementId) {
              isIntersectingElement = true
            }

            if (element.childEls.length > 0) {
              return (
                <li key={element.scrollPos}>
                  <TocAnchor title={element.title} isH2 isIntersectingElement={isIntersectingElement} />
                  <ol className="ml-2">
                    {element.childEls.map((childEl) => {
                      let isIntersectingChildElement = false
                      if (childEl.title === intersectingElementId) {
                        isIntersectingChildElement = true
                      }

                      return (
                        <li key={childEl.scrollPos}>
                          <TocAnchor title={childEl.title} isIntersectingElement={isIntersectingChildElement} />
                        </li>
                      )
                    })}
                  </ol>
                </li>
              )
            } else if (element.childEls.length === 0) {
              return (
                <li key={element.scrollPos}>
                  <TocAnchor title={element.title} isH2 isIntersectingElement={isIntersectingElement} />
                </li>
              )
            }
          })}
        </ol>
      </nav>
    </div>
  )
}