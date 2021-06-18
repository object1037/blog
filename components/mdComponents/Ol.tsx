export default function Ol(props: HTMLElement) {
  return (
    <ol className="list-decimal ml-6 py-2">{props.children}</ol>
  )
}