import clsx from "clsx"
import { FiCopy, FiCheck } from "react-icons/fi"
import React, { ReactChild, ReactElement, useState } from "react"

export interface anchorProps {
  href: string
  children: string
  id?: string
}

export const Anchor = (props: anchorProps) => {
  const targets = props.href.startsWith('#') ? undefined : {
    target: "_blank",
    rel: "noopener noreferrer"
  }
  return (
    <a {...targets} className="text-ppink-300 dark:text-ppink-200 hover:underline" href={props.href} id={props.id}>
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
    <h3 className={clsx(props.className === "sr-only" ? "sr-only" : "break-all text-2xl font-semibold mt-2 mb-3 pt-6")} id={String(props.children)}>
      {props.children}
    </h3>
  )
}

export const H4 = (props: HTMLElement) => {
  return (
    <h4 className="break-all text-xl font-medium mt-4 mb-2">{props.children}</h4>
  )
}

export const Li = (props: HTMLElement) => {
  return (
    <li className={clsx('pt-2', props.className)} id={props.id}>{props.children}</li>
  )
}

export const Ol = (props: HTMLElement) => {
  return (
    <ol className="list-decimal ml-6">{props.children}</ol>
  )
}

export const Paragraph = ({
  children,
}: {
  children: ReactElement
}) => {
  let flag = false
  
  React.Children.forEach(children, (child) => {
    if (child.props?.href?.startsWith('#user-content-fnref')) {
      flag = true
    }
  })
  if (flag) {
    return <>{children}</>
  } else {
    return (
      <p className="text-base leading-7 my-5">{children}</p>
    )
  }
}

export const Ul = (props: HTMLElement) => {
  return (
    <ul className="list-disc ml-6">{props.children}</ul>
  )
}

const copyButtonStyle = [
  'absolute',
  'top-2',
  'right-2',
  'p-2',
  'rounded',
  'bg-[#282c34]',
  'text-ngray-400',
  'hover:text-ngray-300',
  'opacity-0',
  'group-hover:opacity-100',
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

export const Table = (props: HTMLElement) => {
  return (
    <div className="mb-9 overflow-auto box-border">
      <table className="text-left">
        {props.children}
      </table>
    </div>
  )
}

export const TR = (props: HTMLElement) => {
  return (
    <tr className="border-b only:border-0 last:border-0 border-ngray-200 dark:border-ngray-700">{props.children}</tr>
  )
}

export const TH = (props: HTMLTableElement) => {
  return (
    <th className="bg-ngray-100 dark:bg-ngray-800 px-5 py-3 first:rounded-l last:rounded-r">
      {props.children}
    </th>
  )
}

export const TD = (props: HTMLElement) => {
  return (
    <td className="px-5 py-3">{props.children}</td>
  )
}