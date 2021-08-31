import TocAnchor from "./tocAnchor"

export default function ToC({
  tocElements,
  intersectingElementId,
}: {
  tocElements: tocElement[],
  intersectingElementId: string,
}) {
  return (
    <>
    <nav className="sticky top-6 right-0 max-h-screen-12 pl-4 py-4 text-sm dark:border-gray-600 border-gray-300 border-l leading-loose w-64">
      <div className="text-gray-900 dark:text-gray-100 text-lg mb-4 font-semibold">目次</div>
      <ol className="ml-2">
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
    </>
  )
}