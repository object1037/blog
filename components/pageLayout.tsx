import clsx from 'clsx'

export default function PageLayout({
  h1,
  children,
}: {
  h1: string | JSX.Element
  children: React.ReactNode
}) {
  const h1Style = [
    'self-start',
    'text-4xl',
    'font-bold',
    'text-ngray-900',
    'dark:text-ngray-100',
    'pt-12',
    'pb-10',
  ]
  return (
    <main className="mb-20 mx-6 sm:mx-12">
      <section className="flex flex-col justify-center items-center max-w-4xl mx-auto">
        <h1 className={clsx(h1Style)}>{h1}</h1>
        {children}
      </section>
    </main>
  )
}
