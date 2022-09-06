import type { ReactElement } from 'react'
import Layout from '../components/layout'
import PageLayout from '../components/pageLayout'
import {
  siteTitle,
  handleName,
  siteUrl,
  homepage,
  accounts,
} from '../constants/data'
import { Anchor } from '../components/mdComponents'
import { FiCode, FiRss } from 'react-icons/fi'
import clsx from 'clsx'

export default function Page() {
  const linkStyle = [
    'p-2',
    'text-ngray-500',
    'hover:text-black',
    'dark:text-ngray-400',
    'dark:hover:text-white',
    'transition',
  ]

  return (
    <div className="w-full">
      <p className="mb-6">
        <Anchor href={homepage}>{handleName}</Anchor>のブログです。
      </p>
      <div className="flex space-x-2 text-xl mt-12">
        <a
          href={`https://github.com/${accounts.github}/blog`}
          className={clsx(linkStyle)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Source code of this blog"
        >
          <FiCode />
        </a>
        <a
          href={`${siteUrl}/feed.xml`}
          className={clsx(linkStyle)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RSS of this blog"
        >
          <FiRss />
        </a>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout({ page }: { page: ReactElement }) {
  return (
    <Layout
      title={`このブログについて | ${siteTitle}`}
      description={`このブログについて | ${handleName}のブログ`}
      url={`${siteUrl}/about`}
    >
      <PageLayout h1="About">{page}</PageLayout>
    </Layout>
  )
}
