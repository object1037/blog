import Layout from '../components/layout'
import { siteTitle, handleName, siteUrl } from '../components/articleLayout'
import clsx from 'clsx'

export default function About() {
  const linkStyle = [
    'text-blue-500',
    'dark:text-blue-300',
    'hover:underline'
  ]
  
  return (
    <>
    <Layout h1="About" title={`このブログについて | ${siteTitle}`} description={`このブログについて | ${handleName}のブログ`} url={`${siteUrl}/about`}>
      <div className="w-full">
        <p className="mb-6">
          <a href="https://object1037.dev" target="_blank" rel="noopener noreferrer" className={clsx(linkStyle)}>
            {handleName}
          </a>
          のブログです。
        </p>
        <p>
          <a href="https://github.com/object1037/blog" target="_blank" rel="noopener noreferrer" className={clsx(linkStyle)}>
            Source
          </a>
        </p>
      </div>
    </Layout>
    </>
  )
}