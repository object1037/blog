import IconLink from './icon-link'

export default function Footer() {
  return (
  <footer className="flex flex-row items-center pl-4 bg-gray-600 dark:bg-gray-800 relative w-screen">
    <IconLink icon="twitter" link="https://twitter.com/object1037" />
    <IconLink icon="github" link="https://github.com/object1037" />
    <div className="absolute right-8 text-gray-200 font-light text-xs">&copy; 2021 object1037</div>
  </footer>
  )
}
//a