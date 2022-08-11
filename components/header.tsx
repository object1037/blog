import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import profileImg from '../public/images/icon.svg'
import { siteTitle } from '../constants/data'
import Search from './search'

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
    'dark:bg-ngray-900',
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
    'pt-2',
    'w-max'
  ]
  const navStyle = [
    'flex',
    'items-center',
    'justify-between',
    'h-10'
  ]
  const navLinkStyle = [
    'px-3',
    'py-2.5',
    'rounded-md',
    'font-medium',
    'hover:bg-ngray-100',
    'dark:hover:bg-ngray-800',
    'transition'
  ]
  const stickyStyle = [
    'sticky',
    'top-0',
    'z-10'
  ]
  return (
    <>
    <header className={clsx(headerStyle)}>
      <div className={clsx(headerWrapperStyle)}>
        <Link href="/">
          <a className={clsx(logoStyle)}>
            <div className="rounded-full overflow-hidden shadow-sm w-10 h-10">
              <Image src={profileImg} alt="picture of me" className="rounded-full"/>
            </div>
            <span>{siteTitle}</span>
          </a>
        </Link>
      </div>
    </header>
    <nav className={clsx(
      headerStyle,
      'border-b',
      'border-ngray-200',
      'dark:border-ngray-700',
      sticky && stickyStyle
    )}>
      <div className={clsx(headerWrapperStyle, sticky && stickyStyle)}>
        <div className={clsx(navStyle)}>
          <div className='space-x-1 md:space-x-2'>
            <Link href="/">
              <a className={clsx(navLinkStyle)}>Posts</a>
            </Link>
            <Link href="/tags">
              <a className={clsx(navLinkStyle)}>Tags</a>
            </Link>
            <Link href="/about">
              <a className={clsx(navLinkStyle)}>About</a>
            </Link>
          </div>
          {(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY) &&
          <div>
            <Search />
          </div>
          }
        </div>
      </div>
    </nav>
    </>
  )
}