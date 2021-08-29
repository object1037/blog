import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import profileImg from '../public/images/profile.jpg'

export default function Header () {
  const headerStyle = [
    'px-6',
    'sm:px-12',
    'border-b',
    'border-gray-200',
    'dark:border-gray-700',
    'text-gray-900',
    'dark:text-gray-100',
  ]
  return (
    <header className={clsx(headerStyle)}>
      <div className="flex flex-col md:flex-row items-stretch justify-start max-w-5xl mx-auto">
        <Link href="/">
          <a className="h-full py-3 md:py-4 flex flex-row items-center justify-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3">
            <div className="rounded-full overflow-hidden shadow-lg w-12 h-12">
              <Image priority src={profileImg} alt="picture of me" className="rounded-full" placeholder="blur"/>
            </div>
            <span>ゆるふわインターネット</span>
          </a>
        </Link>
        <div className="flex flex-row justify-center">
          <Link href="/tags">
            <a className="hover:bg-gray-100 dark:hover:bg-gray-800 py-5 md:py-4">
              <div className="flex items-center h-full px-3">Tags</div>
            </a>
          </Link>
          <Link href="https://object1037.dev">
            <a target="_blank" rel="noopener" className="hover:bg-gray-100 dark:hover:bg-gray-800 py-5 md:py-4">
              <div className="flex items-center h-full px-3">About</div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}