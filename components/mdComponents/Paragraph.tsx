export default function Paragraph(props: HTMLElement) {
  return (
    <p className="text-base leading-7 mb-5">{props.children}</p>
  )
}