import Image, { ImageProps } from 'next/image'
import clsx from 'clsx'

export default function Im({
  src,
  alt,
  cap,
}: {
  src: ImageProps,
  alt: string,
  cap?: string
}) {
  const imWrapperStyle = [
    'flex',
    'overflow-hidden',
    'rounded',
    'border-0',
    'mt-6',
  ]
  return (
    <>
      <div className={clsx(imWrapperStyle, !cap && 'mb-6')}>
        <Image 
          src={String(src.src)}
          width={src.width}
          height={src.height}
          alt={alt}
          placeholder="blur"
          blurDataURL={src.blurDataURL}
          className="rounded overflow-hidden"
        />
      </div>
      {cap ? <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 mb-6 text-center">{cap}</p> : null}
    </>
  )
}