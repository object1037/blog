export default function Date({ dateString }: { dateString: string }) {
  const year: string = dateString.substr(0, 4)
  const month: string= dateString.substr(4, 2)
  const day: string = dateString.substr(6, 2)
  return <span>{year}/{month}/{day}</span>
}