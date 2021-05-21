import { IconName } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface accountIcon {
  icon: IconName;
  link: string;
}

export default function IconLink (account: accountIcon) {
  return (
    <Link href={account.link}>
      <a target="_blank" rel="noopener" aria-label={account.icon} className="justify-center text-white inline-block p-6 hover:text-gray-400">
        <div className="w-8 h-8"><FontAwesomeIcon icon={['fab', account.icon]} /></div>
      </a>
    </Link>
  )
}