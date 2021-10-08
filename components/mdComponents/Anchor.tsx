export interface anchorProps {
  href: string
  children: string
}

export default function Anchor(props: anchorProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" className="text-ppink-300 dark:text-ppink-200 hover:underline" href={props.href}>
      {props.children}
    </a>
  )
}