export default function Anchor(props: HTMLAnchorElement) {
  return (
    <a target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline" href={props.href}>
      {props.children}
    </a>
  )
}