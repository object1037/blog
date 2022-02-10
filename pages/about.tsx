import type { ReactElement } from 'react'
import Layout from '../components/layout'
import PageLayout from '../components/pageLayout'
import { siteTitle, handleName, siteUrl, homepage, accounts } from '../constants/data'
import { Anchor } from '../components/mdComponents'

export default function Page() {
  return (
    <div className="w-full">
      <p className="mb-6">
        <Anchor href={homepage}>{handleName}</Anchor>のブログです。
      </p>
      <p>
        <Anchor href={`https://github.com/${accounts.github}/blog`}>Source</Anchor> ・ <Anchor href={`${siteUrl}/feed.xml`}>RSS</Anchor>
      </p>
    </div>
  )
}

Page.getLayout = function getLayout({ page }: { page: ReactElement }) {
  return (
    <Layout title={`このブログについて | ${siteTitle}`} description={`このブログについて | ${handleName}のブログ`} url={`${siteUrl}/about`}>
      <PageLayout h1="About">
        {page}
      </PageLayout>
    </Layout>
  )
}