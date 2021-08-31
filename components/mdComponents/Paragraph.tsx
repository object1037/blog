export default function Paragraph(props: HTMLElement) {
  return (
    <p className="text-base leading-relaxed mb-5">{props.children}</p>
  )
}