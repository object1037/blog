import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import profileImg from '../public/images/profile.jpg'

export default function Header ({
  sticky
}: {
  sticky?: boolean
}) {
  const headerStyle = [
    'py-2',
    'px-4',
    'md:px-8',
    'bg-white',
    'dark:bg-gray-900',
    'z-50'
  ]
  const headerWrapperStyle = [
    'max-w-5xl',
    'mx-auto',
  ]
  const logoStyle = [
    'flex',
    'items-center',
    'space-x-3',
    'text-sm',
    'font-bold',
    'px-3',
    'pt-2'
  ]
  const navStyle = [
    'flex',
    'items-center',
    'space-x-1',
    'md:space-x-2'
  ]
  const navLinkStyle = [
    'px-3',
    'py-2',
    'rounded-md',
    'font-medium',
    'hover:bg-gray-100',
    'dark:hover:bg-gray-800',
    'transition'
  ]
  const stickyStyle = [
    'sticky',
    'top-0',
  ]
  return (
    <>
    <header className={clsx(headerStyle)}>
      <div className={clsx(headerWrapperStyle)}>
        <Link href="/">
          <a className={clsx(logoStyle)}>
            <div className="rounded-full overflow-hidden shadow-sm w-10 h-10">
              <Image priority src={profileImg} alt="picture of me" className="rounded-full" placeholder="blur"/>
            </div>
            <span>ゆるふわインターネット</span>
          </a>
        </Link>
      </div>
    </header>
    <nav className={clsx(
      headerStyle,
      'border-b',
      'border-gray-200',
      'dark:border-gray-700',
      sticky && stickyStyle
    )}>
      <div className={clsx(headerWrapperStyle, sticky && stickyStyle)}>
        <div className={clsx(navStyle)}>
          <Link href="/">
            <a className={clsx(navLinkStyle)}>Posts</a>
          </Link>
          <Link href="/tags">
            <a className={clsx(navLinkStyle)}>Tags</a>
          </Link>
          <a href="https://object1037.dev" className={clsx(navLinkStyle)}>About</a>
        </div>
      </div>
    </nav>
    </>
  )
}