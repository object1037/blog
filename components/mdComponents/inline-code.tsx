export default function InlineCode(props: HTMLElement) {
  return <code className="mx-1 bg-gray-100 px-2 py-1 rounded-md dark:bg-gray-800 break-all">{props.children}</code>
}