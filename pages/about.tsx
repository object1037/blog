import Layout from '../components/layout'
import { siteTitle, handleName, siteUrl, homepage, accounts } from '../constants/data'
import A from '../components/mdComponents/Anchor'

export default function About() {
  return (
    <>
    <Layout h1="About" title={`このブログについて | ${siteTitle}`} description={`このブログについて | ${handleName}のブログ`} url={`${siteUrl}/about`}>
      <div className="w-full">
        <p className="mb-6">
          <A href={homepage}>{handleName}</A>のブログです。
        </p>
        <p>
          <A href={`https://github.com/${accounts.github}/blog`}>Source</A> ・ <A href={`${siteUrl}/feed.xml`}>RSS</A>
        </p>
      </div>
    </Layout>
    </>
  )
}