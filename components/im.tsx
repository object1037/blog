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
    'rounded-t',
    'border-0',
    'mt-10',
  ]
  return (
    <>
      <div className={clsx(imWrapperStyle, cap ? 'rounded-t' : 'rounded mb-10')}>
        <Image 
          src={String(src.src)}
          width={src.width}
          height={src.height}
          alt={alt}
          placeholder="blur"
          blurDataURL={src.blurDataURL}
          className="overflow-hidden"
        />
      </div>
      {cap ? <p className="text-gray-600 dark:text-gray-300 text-sm p-3 mb-10 bg-gray-100 dark:bg-gray-800 rounded-b">{cap}</p> : null}
    </>
  )
}