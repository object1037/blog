export default function H1(props: HTMLElement) {
  return (
    <h1 className="text-3xl font-semibold mb-6 mt-8 py-2 border-b border-gray-400">{props.children}</h1>
  )
}