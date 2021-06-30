import { tocElement } from "./layout"

export default function ToC({tocElements}: {tocElements: tocElement[]}) {
  return (
    <>
    <nav className="hidden lg:block sticky top-6 right-0 max-h-screen-12 p-4 text-sm text-gray-500 border-gray-300 border-l leading-loose w-64">
      <div className="text-gray-900 dark:text-gray-100 text-lg mb-4 font-semibold">目次</div>
      <ol className="ml-2">
        {tocElements.map((element) => {
          if (element.childEls.length > 0) {
            return (
              <li key={element.scrollPos}>
                <a href={`#${element.title}`} className="hover:text-gray-900 hover:underline font-semibold">{element.title}</a>
                <ol className="ml-2">
                  {element.childEls.map((childEl) => (
                    <li key={childEl.scrollPos}>
                      <a href={`#${childEl.title}`} className="hover:text-gray-900 hover:underline">{childEl.title}</a>
                    </li>
                  ))}
                </ol>
              </li>
            )
          } else if (element.childEls.length === 0) {
            return (
              <li key={element.scrollPos}>
                <a href={`#${element.title}`} className="hover:text-gray-900 hover:underline font-semibold">{element.title}</a>
              </li>
            )
          }
        })}
      </ol>
    </nav>
    </>
  )
}