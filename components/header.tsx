import Link from 'next/link'
import Image from 'next/image'

export default function Header () {
  return (
    <header className="flex flex-col md:flex-row bg-gray-100 items-center h-32 md:h-20 md:pl-16 text-gray-900">
      <Link href="/">
        <a className="h-full flex flex-row items-center space-x-2 hover:bg-gray-200 px-3">
          <div className="rounded-full shadow-lg w-12 h-12">
            <Image priority src="/images/profile.jpg" alt="picture of me" width={48} height={48} className="rounded-full" />
          </div>
          <span>ゆるふわインターネット</span>
        </a>
      </Link>

      <Link href="https://object1037.vercel.app">
        <a className="h-full">
          <div className="flex items-center px-3 h-full hover:bg-gray-200">About</div>
        </a>
      </Link>
    </header>
  )
}