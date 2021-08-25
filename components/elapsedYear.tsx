import clsx from 'clsx'
import { FiAlertCircle } from 'react-icons/fi'

export default function ElapsedYear({
  yearNum
}: {
  yearNum: number
}) {
  const elapsedYearStyle = [
    'border',
    'border-warnred',
    'text-warnred',
    'p-4',
    'mt-2',
    'rounded-md',
    'flex',
    'flex-row',
    'items-center'
  ]
  return (
    <div className={clsx(yearNum === 0 ? 'hidden' : elapsedYearStyle)}>
      <span className="text-lg mr-2"><FiAlertCircle /></span>この記事は公開から{yearNum}年以上が経過しています
    </div>
  )
}