export default function H3(props: HTMLElement) {
  return (
    <h3 className="text-2xl font-semibold mt-4 py-2" id={String(props.children)}>{props.children}</h3>
  )
}