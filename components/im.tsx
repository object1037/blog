import Image, { ImageProps } from 'next/image'
interface Info {
  src: ImageProps;
  alt: string;
  cap?: string;
}

export default function Im(info: Info) {
  return (
    <div className="flex flex-col items-center mt-6 mb-4 space-y-4">
      <div className="flex-grow-0">
        <Image 
          src={info.src} 
          alt={info.alt}
          placeholder="blur"
        />
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{info.cap}</p>
    </div>
  )
}