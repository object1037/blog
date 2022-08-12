import IconLink from './icon-link'
import { FiTwitter, FiGithub } from 'react-icons/fi'
import { accounts, handleName } from '../constants/data'

export default function Footer() {
  return (
  <footer className="flex items-center bg-ngray-100 dark:bg-ngray-800 py-2 px-6 sm:px-12 mt-auto">
    <div className="flex flex-row items-center justify-between w-full max-w-5xl mx-auto">
      <div className="flex flex-row space-x-2">
        <IconLink label="Twitter link" link={`https://twitter.com/${accounts.twitter}`} >
          <FiTwitter />
        </IconLink>
        <IconLink label="GitHub link" link={`https://github.com/${accounts.github}`} >
          <FiGithub />
        </IconLink>
      </div>
      <div className="text-ngray-800 dark:text-ngray-200 font-light text-xs">&copy; 2022 {handleName}</div>
    </div>
  </footer>
  )
}