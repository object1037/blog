export default function H2(props: HTMLElement) {
  return (
    <h2 className="text-3xl font-bold mb-6 mt-8 py-2 border-b border-gray-400 dark:border-gray-500" id={String(props.children)} >{props.children}</h2>
  )
}