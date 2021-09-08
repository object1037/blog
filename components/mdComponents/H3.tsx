export default function H3(props: HTMLElement) {
  return (
    <h3 className="break-all text-2xl font-semibold mt-2 mb-3 pt-6" id={String(props.children)}>{props.children}</h3>
  )
}