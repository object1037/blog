import clsx from "clsx"

export interface anchorProps {
  href: string
  children: string
}

export const Anchor = (props: anchorProps) => {
  return (
    <a target="_blank" rel="noopener noreferrer" className="text-ppink-300 dark:text-ppink-200 hover:underline" href={props.href}>
      {props.children}
    </a>
  )
}

export const Blockquote = (props: HTMLElement) => {
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

export const H2 = (props: HTMLElement) => {
  return (
    <h2 className="break-all text-3xl font-bold my-6 pt-6" id={String(props.children)} >{props.children}</h2>
  )
}

export const H3 = (props: HTMLElement) => {
  return (
    <h3 className="break-all text-2xl font-semibold mt-2 mb-3 pt-6" id={String(props.children)}>{props.children}</h3>
  )
}

export const H4 = (props: HTMLElement) => {
  return (
    <h4 className="break-all text-xl font-medium mt-4 mb-2">{props.children}</h4>
  )
}

export const Li = (props: HTMLElement) => {
  return (
    <li className="pt-2">{props.children}</li>
  )
}

export const Ol = (props: HTMLElement) => {
  return (
    <ol className="list-decimal ml-6">{props.children}</ol>
  )
}

export const Paragraph = (props: HTMLElement) => {
  return (
    <p className="text-base leading-7 my-5">{props.children}</p>
  )
}

export const Ul = (props: HTMLElement) => {
  return (
    <ul className="list-disc ml-6">{props.children}</ul>
  )
}