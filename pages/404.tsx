import Layout from '../components/layout'
import { siteTitle } from '../constants/data'

export default function Custom404() {
  return (
    <Layout h1="404" title={`404 | ${siteTitle}`} description={`404 | ${siteTitle}`}>
      <div className='w-full'>
        <p>Page not found</p>
      </div>
    </Layout>
  )
}