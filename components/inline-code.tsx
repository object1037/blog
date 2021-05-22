export default function Code({children}: {children: string}) {
  return <code className="mx-1 bg-gray-200 px-2 py-1 rounded dark:bg-gray-800">{children}</code>
}