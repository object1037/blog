import clsx from 'clsx'

export default function ElapsedYear({
  yearNum
}: {
  yearNum: number
}) {
  let elapsedYearStyle = [
    'hidden',
  ]
  if (yearNum > 0) {
    elapsedYearStyle = [
      'bg-rose-100',
      'dark:bg-rose-900',
      'p-5',
      'mt-2',
      'font-semibold'
    ]
  }
  return (
    <div className={clsx(elapsedYearStyle)}>
      この記事は公開から{yearNum}年以上経過しています
    </div>
  )
}