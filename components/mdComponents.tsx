import clsx from "clsx"
import { FiCopy, FiCheck } from "react-icons/fi"
import React, { ComponentPropsWithoutRef, useRef, useState } from "react"
import Image from 'next/image'

export const Anchor = (props: ComponentPropsWithoutRef<"a">) => {
  const { className, ...rest } = props
  const targets = props.href?.startsWith('#') ? undefined : {
    target: "_blank",
    rel: "noopener noreferrer"
  }
  return (
    <a {...targets} className={clsx("text-ppink-300 dark:text-ppink-200 hover:underline", className)} {...rest} />
  )
}

export const Blockquote = (props: ComponentPropsWithoutRef<"blockquote">) => {
  const { className, ...rest } = props
  const quoteStyle = [
    'bg-ngray-100',
    'dark:bg-ngray-800',
    'rounded-md',
    'text-ngray-700',
    'dark:text-ngray-200',
    'border-l-[0.375rem]',
    'border-ngray-400',
    'dark:border-ngray-500',
    'px-5',
    'py-1',
    'my-3',
  ]
  return (
    <blockquote className={clsx(quoteStyle, className)} {...rest} />
  )
}

export const H2 = (props: ComponentPropsWithoutRef<"h2">) => {
  const { className, id, ...rest } = props

  let idStr = ''
  if (typeof props.children === 'object' && props.children) {
    idStr = String(React.Children.toArray(props.children)[0])
  } else {
    idStr = String(props.children)
  }
  return (
    <h2 className={clsx("break-all text-3xl font-bold my-6 pt-6", className)} id={id ? id : idStr} {...rest} />
  )
}

export const H3 = (props: ComponentPropsWithoutRef<"h3">) => {
  const { className, id, ...rest } = props

  let idStr = ''
  if (typeof props.children === 'object' && props.children) {
    idStr = String(React.Children.toArray(props.children)[0])
  } else {
    idStr = String(props.children)
  }

  return (
    <h3 className={clsx("break-all text-2xl font-semibold mt-2 mb-3 pt-6", className)} id={id ? id : idStr} {...rest} />
  )
}

export const H4 = (props: ComponentPropsWithoutRef<"h4">) => {
  const { className, ...rest } = props
  return (
    <h4 className={clsx("break-all text-xl font-medium mt-4 mb-2", className)} {...rest} />
  )
}

export const Li = (props: ComponentPropsWithoutRef<"li">) => {
  const { className, ...rest } = props
  return (
    <li className={clsx('pt-2', className)} {...rest} />
  )
}

export const Ol = (props: ComponentPropsWithoutRef<"ol">) => {
  const { className, ...rest } = props
  return (
    <ol className={clsx("list-decimal ml-6", className)} {...rest} />
  )
}

export const Paragraph = (props: ComponentPropsWithoutRef<"p">) => {
  const { className, ...rest } = props
  let flag = false
  
  // removes p tags from around images, footnotes, and summary
  React.Children.forEach(props.children, (child) => {
    if (typeof child === 'object' && child && 'props' in child) {
      if (child.props.href?.startsWith('#user-content-fnref') || child.props.src || child.type === "summary") {
        flag = true
      }
    }
  })
  if (flag) {
    return <>{props.children}</>
  } else {
    return (
      <p className={clsx("text-base leading-7 my-5", className)} {...rest} />
    )
  }
}

export const Ul = (props: ComponentPropsWithoutRef<"ul">) => {
  const { className, ...rest } = props
  return (
    <ul className={clsx("list-disc ml-6", className)} {...rest} />
  )
}

const copyButtonStyle = [
  'absolute',
  'top-2',
  'right-2',
  'p-2',
  'rounded-md',
  'bg-ngray-800',
  'text-ngray-400',
  'hover:text-ngray-300',
  'opacity-0',
  'group-hover:opacity-100',
  'transition'
]

export const Pre = (props: ComponentPropsWithoutRef<"pre">) => {
  const codeRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const clickHandler = (text: string | undefined) => {
    navigator.clipboard.writeText(text ? text : '').then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2500)
    })
  }

  return (
    <pre className="relative group" ref={codeRef}>
      <button className={clsx(copyButtonStyle)} onClick={() => clickHandler(codeRef.current?.innerText.trim())} aria-label="Copy code">
        <span className="text-xl">
          <FiCopy className={clsx(copied && 'hidden')} />
          <FiCheck className={clsx(!copied && 'hidden')} />
        </span>
      </button>
      {props.children}
    </pre>
  )
}

export const Table = (props: ComponentPropsWithoutRef<"table">) => {
  const { className, ...rest } = props
  return (
    <div className="mb-9 overflow-auto box-border">
      <table className={clsx("text-left", className)} {...rest} />
    </div>
  )
}

export const TR = (props: ComponentPropsWithoutRef<"tr">) => {
  const { className, ...rest } = props
  return (
    <tr className={clsx("border-b only:border-0 last:border-0 border-ngray-200 dark:border-ngray-700", className)} {...rest} />
  )
}

export const TH = (props: ComponentPropsWithoutRef<"th">) => {
  const { className, ...rest } = props
  return (
    <th className={clsx("bg-ngray-100 dark:bg-ngray-800 px-5 py-3 first:rounded-l-md last:rounded-r-md", className)} {...rest} />
  )
}

export const TD = (props: ComponentPropsWithoutRef<"td">) => {
  const { className, ...rest } = props
  return (
    <td className={clsx("px-5 py-3", className)} {...rest} />
  )
}

export const Img = (props: ComponentPropsWithoutRef<"img">) => {
  const [loading, setLoading] = useState(true)
  
  const re = /[^\|]+\|[0-9]+:[0-9]+$/
  if (!props.alt || !re.test(props.alt)) {
    console.error(`Invalid alt format for ${props.src}`)
    return (
      <>{props.alt}</>
    )
  }

  const alt = props.alt.substring(0, props.alt.indexOf('|'))
  const w = props.alt.substring(props.alt.indexOf('|') + 1, props.alt.indexOf(':'))
  const h = props.alt.substring(props.alt.indexOf(':') + 1)

  const imWrapperStyle = [
    'flex',
    'overflow-hidden',
    'rounded-t-md',
    'border-0',
    'mt-10',
  ]
  const imBgStyle = [
    'overflow-hidden',
    'bg-ngray-200',
    'dark:bg-ngray-700',
    loading && 'animate-pulse'
  ]

  return (
    <>
    <div className={clsx(imWrapperStyle, props.title ? 'rounded-t-md' : 'rounded-md mb-9')}>
      <Image
        src={`/images/${props.src}`}
        alt={alt}
        width={w}
        height={h}
        className={clsx(imBgStyle)}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
    {props.title ? <p className="text-ngray-600 dark:text-ngray-300 text-sm py-3 px-4 mb-9 bg-ngray-100 dark:bg-ngray-800 rounded-b-md">{props.title}</p> : null}
    </>
  )
}