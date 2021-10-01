import Layout from '../components/layout'
import { siteTitle, handleName, siteUrl } from '../constants/data'
import A from '../components/mdComponents/Anchor'

export default function About() {
  return (
    <>
    <Layout h1="About" title={`このブログについて | ${siteTitle}`} description={`このブログについて | ${handleName}のブログ`} url={`${siteUrl}/about`}>
      <div className="w-full">
        <p className="mb-6">
          <A href="https://object1037.dev">{handleName}</A>のブログです。
        </p>
        <p>
          <A href="https://github.com/object1037/blog">Source</A>
        </p>
      </div>
    </Layout>
    </>
  )
}