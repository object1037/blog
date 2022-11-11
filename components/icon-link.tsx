export default function IconLink({
  link,
  label,
  children,
}: {
  link: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-4 hover:text-ngray-400 dark:hover:text-ngray-500 transition"
    >
      <p className="text-3xl">{children}</p>
    </a>
  )
}
