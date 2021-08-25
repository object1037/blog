import clsx from 'clsx'

export default function ElapsedYear({
  yearNum
}: {
  yearNum: number
}) {
  const elapsedYearStyle = [
    'bg-rose-100',
    'dark:bg-pink-900',
    'p-5',
    'mt-2',
    'font-semibold',
    'rounded-md',
  ]
  return (
    <div className={clsx(yearNum === 0 ? 'hidden' : elapsedYearStyle)}>
      この記事は公開から{yearNum}年以上経過しています
    </div>
  )
}