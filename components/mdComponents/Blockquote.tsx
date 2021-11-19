import clsx from "clsx"

export default function Blockquote(props: HTMLElement) {
  const quoteStyle = [
    'bg-gray-100',
    'dark:bg-gray-800',
    'rounded',
    'text-gray-600',
    'dark:text-gray-300',
    'border-l-4',
    'border-gray-400',
    'dark:border-gray-500',
    'px-5',
    'py-1',
    'my-3',
  ]
  return (
    <blockquote className={clsx(quoteStyle)}>{props.children}</blockquote>
  )
}