import { tocElement } from "./layout"

export default function ToC({tocElements}: {tocElements: tocElement[]}) {
  return (
    <>
    <section>
      <ol>
        {tocElements.map((element) => {
          if (element.childEls.length > 0) {
            return (
              <li key={element.scrollPos}>
                <a href={`#${element.title}`}>{element.title}</a>
                <ol>
                  {element.childEls.map((childEl) => (
                    <li key={childEl.scrollPos}>
                      <a href={`#${childEl.title}`} className="text-gray-400">{childEl.title}</a>
                    </li>
                  ))}
                </ol>
              </li>
            )
          } else if (element.childEls.length === 0) {
            return (
              <li key={element.scrollPos}>
                <a href={`#${element.title}`}>{element.title}</a>
              </li>
            )
          }
        })}
      </ol>
    </section>
    </>
  )
}