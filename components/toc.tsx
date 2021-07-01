import { tocElement } from "./layout"
import TocAnchor from "./tocAnchor"

export default function ToC({tocElements}: {tocElements: tocElement[]}) {
  return (
    <>
    <nav className="hidden lg:block sticky top-6 right-0 max-h-screen-12 p-4 text-sm dark:border-gray-600 border-gray-300 border-l leading-loose w-64">
      <div className="text-gray-900 dark:text-gray-100 text-lg mb-4 font-semibold">目次</div>
      <ol className="ml-2">
        {tocElements.map((element) => {
          if (element.childEls.length > 0) {
            return (
              <li key={element.scrollPos}>
                <TocAnchor title={element.title} isH2 />
                <ol className="ml-2">
                  {element.childEls.map((childEl) => (
                    <li key={childEl.scrollPos}>
                      <TocAnchor title={childEl.title} />
                    </li>
                  ))}
                </ol>
              </li>
            )
          } else if (element.childEls.length === 0) {
            return (
              <li key={element.scrollPos}>
                <TocAnchor title={element.title} isH2 />
              </li>
            )
          }
        })}
      </ol>
    </nav>
    </>
  )
}