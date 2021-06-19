export default function Ol(props: HTMLElement) {
  return (
    <ol className="list-decimal ml-6 py-1">{props.children}</ol>
  )
}