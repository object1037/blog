import { tocElement } from "./layout"

export default function ToC({tocElements}: {tocElements: tocElement[]}) {
  console.log(tocElements)
  return (
    <>
    <section>
      <ol>
        {tocElements.map((element) => (
          <li key={element.scrollPos}>{element.title}</li>
        ))}
      </ol>
    </section>
    </>
  )
}