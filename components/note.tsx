import clsx from 'clsx'
import { FiAlertCircle, FiInfo } from 'react-icons/fi'

const noteStyle = [
  'flex',
  'items-center',
  'border',
  'border-transparent',
  'text-base',
  'py-5',
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
  'dark:border-red-900',
  'dark:text-red-100'
]
const warnStyle = [
  'bg-orange-50',
  'text-orange-900',
  'dark:border-orange-900',
  'dark:text-orange-100'
]
const infoStyle = [
  'bg-blue-50',
  'text-blue-900',
  'dark:border-blue-900',
  'dark:text-blue-100'
]

export function NoteDanger({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx(noteStyle, dangerStyle, [className])}>
      <span className="text-xl mr-2 text-red-500"><FiAlertCircle /></span>
      <p>{children}</p>
    </div>
  )
}

export function NoteWarn({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx(noteStyle, warnStyle, [className])}>
      <span className="text-xl mr-2 text-orange-500"><FiAlertCircle /></span>
      <p>{children}</p>
    </div>
  )
}

export function NoteInfo({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx(noteStyle, infoStyle, [className])}>
      <span className="text-xl mr-2 text-blue-500"><FiInfo /></span>
      <p>{children}</p>
    </div>
  )
}