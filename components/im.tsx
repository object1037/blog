import Image from 'next/image'

interface Info {
  src: string;
  w: string;
  h: string;
  alt: string;
}

export default function Im(info: Info) {
  return <div className="flex-grow-0"><Image src={info.src} width={info.w} height={info.h} alt={info.alt} /></div>
}