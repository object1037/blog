export default function H3(props: HTMLElement) {
  return (
    <h3 className="text-2xl font-semibold mt-8 mb-3" id={String(props.children)}>{props.children}</h3>
  )
}