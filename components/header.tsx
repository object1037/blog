import Link from 'next/link'
import clsx from 'clsx'
import { siteTitle } from '../constants/data'
import Search from './search'
import Image from 'next/image'
import profileImg from '../public/apple-touch-icon.png'

export default function Header({ sticky }: { sticky?: boolean }) {
  const wrapperStyle = [
    'bg-white',
    'dark:bg-ngray-900',
    'max-w-5xl',
    'w-full',
    'mx-auto',
    'py-2',
  ]
  const navStyle = ['flex', 'items-center', 'justify-between']
  const navLinkStyle = [
    'h-10',
    'flex items-center px-3',
    'rounded-lg',
    'font-medium',
    'hover:bg-ngray-100',
    'dark:hover:bg-ngray-800',
    'transition',
    'inline-block',
  ]
  const stickyStyle = ['sticky', 'top-0', 'z-10']
  return (
    <>
      <header className="px-6 sm:px-12">
        <div className={clsx(wrapperStyle, 'mt-3.5 mb-1')}>
          <Link href="/">
            <p className="flex items-center max-w-max gap-x-4">
              <span className="overflow-hidden rounded-full w-10 h-10">
                <Image
                  src={profileImg}
                  alt="my icon"
                  width={40}
                  height={40}
                  placeholder="blur"
                  priority
                />
              </span>
              <span className="tracking-widest font-bold text-sm">
                {siteTitle}
              </span>
            </p>
          </Link>
        </div>
      </header>
      <nav
        className={clsx(
          'border-b',
          'border-ngray-200',
          'dark:border-ngray-700',
          'px-6',
          'sm:px-12',
          sticky && stickyStyle
        )}
      >
        <div className={clsx(wrapperStyle, navStyle)}>
          <div className="flex flex-wrap items-center gap-x-1 md:gap-x-2">
            <Link href="/">
              <p className={clsx(navLinkStyle)}>
                <span className="capsizedText">Posts</span>
              </p>
            </Link>
            <Link href="/tags">
              <p className={clsx(navLinkStyle)}>
                <span className="capsizedText">Tags</span>
              </p>
            </Link>
            <Link href="/about">
              <p className={clsx(navLinkStyle)}>
                <span className="capsizedText">About</span>
              </p>
            </Link>
          </div>
          {process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID &&
            process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY && (
              <div>
                <Search />
              </div>
            )}
        </div>
      </nav>
    </>
  )
}
