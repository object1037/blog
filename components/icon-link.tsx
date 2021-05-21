import { IconName } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface accountIcon {
  icon: IconName
  link: string
}

export default function IconLink(account: accountIcon) {
  return (
    <Link href={account.link}>
      <a target="_blank" rel="noopener noreferrer" aria-label={account.icon} className="p-6 text-white hover:text-gray-400">
        <p className="w-8 h-8"><FontAwesomeIcon icon={['fab', account.icon]} /></p>
      </a>
    </Link>
  )
}