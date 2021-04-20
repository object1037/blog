import Account from './accounts'

export default function Footer() {
  return (
  <footer className="flex flex-row items-center pl-4 bg-gray-600 h-20 relative w-screen mt-20">
    <Account icon="twitter" link="https://twitter.com/object1037" hover="hover:text-gray-300" />
    <Account icon="github" link="https://github.com/object1037" hover="hover:text-gray-300" />
    <div className="absolute right-8 text-gray-200 font-light text-xs">&copy; 2021 object1037</div>
  </footer>
  )
}