export default function Paragraph(props: HTMLElement) {
  return (
    <p className="text-base leading-7 my-5">{props.children}</p>
  )
}