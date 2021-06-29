import { tocElement } from "./layout"

export default function ToC({tocElements}: {tocElements: tocElement[]}) {
  return (
    <>
    <section>
      <ol>
        {tocElements.map((element) => {
          if (element.level === "H2") {
            return (
              <li key={element.scrollPos}>
                <a href={`#${element.title}`}>{element.title}</a>
              </li>
            )
          } else {
            return (
              <li key={element.scrollPos} className="pl-4">
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