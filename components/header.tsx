import Link from 'next/link'
import clsx from 'clsx'
import { siteTitle } from '../constants/data'
import Search from './search'
import Icon from './icon'
//import Image from 'next/image'
//import profileImg from '../public/images/icon.svg'

export default function Header ({
  sticky
}: {
  sticky?: boolean
}) {
  const wrapperStyle = [
    'bg-white',
    'dark:bg-ngray-900',
    'max-w-5xl',
    'w-full',
    'mx-auto',
    'py-2',
  ]
  const navStyle = [
    'flex',
    'items-center',
    'justify-between',
  ]
  const navLinkStyle = [
    'h-10',
    'flex items-center px-3',
    'rounded-lg',
    'font-medium',
    'hover:bg-ngray-100',
    'dark:hover:bg-ngray-800',
    'transition',
    'inline-block'
  ]
  const stickyStyle = [
    'sticky',
    'top-0',
    'z-10'
  ]
  return (
    <>
    <header className={clsx(wrapperStyle, 'mt-4 mb-2')}>
      <Link href="/">
        <a className='my-10'>
          <span className='tracking-widest font-bold text-sm'>{siteTitle}</span>
        </a>
      </Link>
    </header>
    <nav className={clsx(
      'border-b',
      'border-ngray-200',
      'dark:border-ngray-700',
      '-mx-6',
      'sm:-mx-12',
      'px-6',
      'sm:px-12',
      sticky && stickyStyle
    )}>
      <div className={clsx(wrapperStyle, navStyle)}>
        <div className='flex flex-wrap items-center gap-x-1 md:gap-x-2'>
          <Link href="/">
            <a className='w-10 h-10 hover:bg-ngray-100 dark:hover:bg-ngray-800 transition rounded-full p-1'>
              <Icon />
            </a>
          </Link>
          <Link href="/tags">
            <a className={clsx(navLinkStyle)}>
              <span className='capsizedText'>Tags</span>
            </a>
          </Link>
          <Link href="/about">
            <a className={clsx(navLinkStyle)}>
              <span className='capsizedText'>About</span>
            </a>
          </Link>
        </div>
        {(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY) &&
        <div>
          <Search />
        </div>
        }
      </div>
    </nav>
    </>
  )
}