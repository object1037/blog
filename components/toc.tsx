import TocAnchor from "./tocAnchor"
import { FiList } from "react-icons/fi"

export default function ToC({
  tocElements,
  intersectingElementId,
}: {
  tocElements: tocElement[],
  intersectingElementId: string,
}) {
  return (
    <>
    <nav className="sticky top-6 max-h-toc overflow-y-auto right-0 pl-4 py-4 text-sm dark:border-gray-600 border-gray-300 border-l leading-loose w-56">
      <div className="-ml-1 inline-flex flex-row items-center text-lg mb-4 font-semibold">
        <span className="w-9 h-9 flex justify-center content-center items-center p-1 mr-2 rounded-full bg-gray-100 dark:bg-gray-800">
          <FiList className="inline-block" />
        </span>
        目次
      </div>
      <ol>
        {tocElements.map((element) => {
          let isIntersectingElement = false
          if (element.title === intersectingElementId) {
            isIntersectingElement = true
          }

          if (element.childEls.length > 0) {
            return (
              <li key={element.scrollPos} className="truncate">
                <TocAnchor title={element.title} isH2 isIntersectingElement={isIntersectingElement} />
                <ol className="ml-3">
                  {element.childEls.map((childEl) => {
                    let isIntersectingChildElement = false
                    if (childEl.title === intersectingElementId) {
                      isIntersectingChildElement = true
                    }

                    return (
                      <li key={childEl.scrollPos} className="truncate">
                        <TocAnchor title={childEl.title} isIntersectingElement={isIntersectingChildElement} />
                      </li>
                    )
                  })}
                </ol>
              </li>
            )
          } else if (element.childEls.length === 0) {
            return (
              <li key={element.scrollPos} className="truncate">
                <TocAnchor title={element.title} isH2 isIntersectingElement={isIntersectingElement} />
              </li>
            )
          }
        })}
      </ol>
    </nav>
    </>
  )
}