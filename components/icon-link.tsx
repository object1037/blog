import Link from 'next/link'

export default function IconLink({
  link,
  label,
  children,
}: {
  link: string,
  label: string,
  children: React.ReactNode,
}) {
  return (
    <Link href={link}>
      <a target="_blank" rel="noopener noreferrer" aria-label={label} className="p-4 text-white hover:text-gray-400 transition">
        <p className="text-3xl">{children}</p>
      </a>
    </Link>
  )
}