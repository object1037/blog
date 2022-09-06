export default function DateDisplay({ dateString }: { dateString: string }) {
  const year: string = dateString.substring(0, 4)
  const month: string = dateString.substring(4, 6)
  const day: string = dateString.substring(6, 8)
  return (
    <time dateTime={`${year}-${month}-${day}`}>
      {year}/{month}/{day}
    </time>
  )
}
