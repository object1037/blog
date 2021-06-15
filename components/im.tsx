import Image from 'next/image'

interface Info {
  src: string;
  w: string;
  h: string;
  alt: string;
  cap?: string;
}

export default function Im(info: Info) {
  return (
    <div className="flex flex-col items-center mt-6 mb-4 space-y-4">
      <div className="flex-grow-0">
        <Image src={`/images/${info.src}`} width={info.w} height={info.h} alt={info.alt} />
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{info.cap}</p>
    </div>
  )
}