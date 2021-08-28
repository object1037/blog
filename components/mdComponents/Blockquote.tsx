export default function Blockquote(props: HTMLElement) {
  return (
    <blockquote className="bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300 border-l-4 border-gray-400 dark:border-gray-500 px-4 pb-4 pt-2 my-3">{props.children}</blockquote>
  )
}