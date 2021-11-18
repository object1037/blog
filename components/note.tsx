import clsx from 'clsx'
import { FiAlertCircle, FiInfo } from 'react-icons/fi'

export interface noteProps {
  children: React.ReactNode
  className?: string
  type?: "info" | "warn" | "danger"
}

const noteStyle = [
  'flex',
  'items-center',
  'border',
  'border-transparent',
  'text-base',
  'px-4',
  'rounded-md',
  'w-full',
  'mx-auto',
  'text-gray-800',
  'dark:bg-transparent',
]
const dangerStyle = [
  'bg-red-50',
  'text-red-900',
  'dark:border-red-600',
  'dark:text-red-100'
]
const warnStyle = [
  'bg-orange-50',
  'text-orange-900',
  'dark:border-orange-600',
  'dark:text-orange-100'
]
const infoStyle = [
  'bg-blue-50',
  'text-blue-900',
  'dark:border-blue-600',
  'dark:text-blue-100'
]
const iconStyle = [
  'text-xl',
  'mr-2',
]

export default function Note({
  children,
  className,
  type = "info"
}: noteProps) {
  let colorStyle = infoStyle
  let iconColor = "text-blue-500"
  const margin = typeof children === "string" && "mb-5"

  if (type === "warn") {
    colorStyle = warnStyle
    iconColor = "text-orange-500"
  } else if (type === "danger") {
    colorStyle = dangerStyle
    iconColor = "text-red-500"
  }

  return (
    <div className={clsx(noteStyle, colorStyle, [className])}>
      <span className={clsx(iconStyle, iconColor)}>
        {type === "info" ? <FiInfo /> : <FiAlertCircle />}
      </span>
      <div className={clsx(margin, "mt-5", "leading-7")}>{children}</div>
    </div>
  )
}