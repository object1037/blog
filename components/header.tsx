import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import profileImg from '../public/images/profile.jpg'

export default function Header () {
  const headerStyle = [
    'py-2',
    'px-4',
    'md:px-8',
    'border-b',
    'border-gray-200',
    'dark:border-gray-700',
    'sticky',
    'sticky',
    '-top-16',
    'bg-white',
    'dark:bg-gray-900',
    'z-50'
  ]
  const headerWrapperStyle = [
    'max-w-5xl',
    'mx-auto',
    'flex',
    'flex-col',
    'space-y-4',
    'sticky',
    'top-0'
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
  return (
    <header className={clsx(headerStyle)}>
      <div className={clsx(headerWrapperStyle)}>
        <Link href="/">
          <a className={clsx(logoStyle)}>
            <div className="rounded-full overflow-hidden shadow-lg w-10 h-10">
              <Image priority src={profileImg} alt="picture of me" className="rounded-full" placeholder="blur"/>
            </div>
            <span>ゆるふわインターネット</span>
          </a>
        </Link>
        <div className="sticky top-0">
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
      </div>
    </header>
  )
}