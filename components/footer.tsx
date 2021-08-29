import IconLink from './icon-link'
import { FaTwitter, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
  <footer className="flex items-center bg-gray-600 dark:bg-gray-800 py-2 px-6 mt-auto">
    <div className="flex flex-row items-center justify-between w-full max-w-5xl mx-auto">
      <div className="flex flex-row space-x-2">
        <IconLink label="Twitterのリンク" link="https://twitter.com/object1037" >
          <FaTwitter />
        </IconLink>
        <IconLink label="GitHubのリンク" link="https://github.com/object1037" >
          <FaGithub />
        </IconLink>
      </div>
      <div className="text-gray-200 font-light text-xs">&copy; 2021 object1037</div>
    </div>
  </footer>
  )
}