import Image from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'

export default function Im({
  src,
  alt,
  w,
  h,
  cap,
}: {
  src: string,
  alt: string,
  w: string | number,
  h: string | number,
  cap?: string
}) {
  const [loading, setLoading] = useState(true)
  const imWrapperStyle = [
    'flex',
    'overflow-hidden',
    'rounded-t',
    'border-0',
    'mt-10',
  ]
  const imBgStyle = [
    'overflow-hidden',
    'bg-ngray-200',
    'dark:bg-ngray-700',
    loading && 'animate-pulse'
  ]
  return (
    <>
      <div className={clsx(imWrapperStyle, cap ? 'rounded-t' : 'rounded mb-9')}>
        <Image 
          src={`/images/${src}`}
          width={w}
          height={h}
          alt={alt}
          className={clsx(imBgStyle)}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      {cap ? <p className="text-ngray-600 dark:text-ngray-300 text-sm py-3 px-4 mb-9 bg-ngray-100 dark:bg-ngray-800 rounded-b">{cap}</p> : null}
    </>
  )
}