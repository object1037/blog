import type { ReactElement } from 'react'
import Layout from '../components/layout'
import PageLayout from '../components/pageLayout'
import { siteTitle, handleName, siteUrl, homepage, accounts } from '../constants/data'
import A from '../components/mdComponents/Anchor'

export default function Page() {
  return (
    <div className="w-full">
      <p className="mb-6">
        <A href={homepage}>{handleName}</A>のブログです。
      </p>
      <p>
        <A href={`https://github.com/${accounts.github}/blog`}>Source</A> ・ <A href={`${siteUrl}/feed.xml`}>RSS</A>
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