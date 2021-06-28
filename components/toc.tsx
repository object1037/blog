import { tocElement } from "./layout"

export default function ToC({tocElements}: {tocElements: tocElement[]}) {
  return (
    <>
    <section>
      <ol>
        {tocElements.map((element) => (
          <li key={element.scrollPos}>
            <a href={`#${element.title}`}>{element.title}</a>
          </li>
        ))}
      </ol>
    </section>
    </>
  )
}