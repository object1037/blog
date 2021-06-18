export default function Paragraph(props: HTMLElement) {
  return (
    <p className="text-base leading-relaxed pt-2">{props.children}</p>
  )
}