import clsx from "clsx"
import { FiCopy, FiCheck } from "react-icons/fi"
import { ReactChild, ReactElement, useState } from "react"

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
    'bg-ngray-100',
    'dark:bg-ngray-800',
    'rounded',
    'text-ngray-600',
    'dark:text-ngray-300',
    'border-l-4',
    'border-ngray-400',
    'dark:border-ngray-500',
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

const copyButtonStyle = [
  'absolute',
  'top-2.5',
  'right-2.5',
  'p-2',
  'rounded',
  'bg-gray-700',
  'hover:bg-gray-600',
  'text-gray-400',
  'border',
  'border-gray-500',
  'invisible',
  'group-hover:visible',
  'transition'
]

export const Pre = (props: { children: ReactElement }) => {
  const [copied, setCopied] = useState(false)

  const clickHandler = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2500)
    })
  }
  const text: string = props.children.props.children.map((el: ReactChild) => {
    if (typeof el === 'object') {
      return (el.props.children)
    } else {
      return el
    }
  }).join('').trim()

  return (
    <pre className="relative group">
      <button className={clsx(copyButtonStyle)} onClick={() => clickHandler(text)}>
        <span className="text-xl">
          <FiCopy className={clsx(copied && 'hidden')} />
          <FiCheck className={clsx(!copied && 'hidden')} />
        </span>
      </button>
      {props.children}
    </pre>
  )
}