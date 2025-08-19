export type ToCEl = {
  level: number
  text: string
  id: string
  children: ToCEl[]
}

export const getToC = () => {
  const headings = Array.from(document.querySelectorAll('h2,h3'))
  const headingsToC: ToCEl[] = headings.map((heading) => ({
    level: Number.parseInt(heading.tagName.slice(1), 10),
    text:
      (heading instanceof HTMLElement
        ? heading.innerText
        : heading.textContent) ?? '',
    id: heading.id,
    children: [],
  }))

  const toc = headingsToC.reduce((acc: ToCEl[], heading: ToCEl) => {
    let parent = acc

    while (parent.length > 0) {
      const last = parent.slice(-1)[0]
      if (!last || last.level >= heading.level) {
        break
      }
      parent = last.children
    }

    parent.push(heading)
    return acc
  }, [])

  return toc
}
