import Image from 'next/image'

interface Info {
  src: string;
  width: string;
  height: string;
}

export default function Im(info: Info) {
  return <div className="flex-grow-0"><Image src={info.src} width={info.width} height={info.height} /></div>
}