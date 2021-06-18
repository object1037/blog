export default function Blockquote(props: HTMLElement) {
  return (
    <blockquote className="italic text-gray-500 dark:text-gray-300 border-l-4 pl-4 pb-4 pt-2 my-3">{props.children}</blockquote>
  )
}