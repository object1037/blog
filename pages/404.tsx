import type { ReactElement } from 'react'
import Layout from '../components/layout'
import { siteTitle } from '../constants/data'

export default function Custom404() {
  return (
    <div className='w-full'>
      <p>Page not found</p>
    </div>
  )
}

Custom404.getLayout = function getLayout({ page }: { page: ReactElement }) {
  return (
    <Layout h1="404" title={`404 | ${siteTitle}`} description={`404 | ${siteTitle}`}>
      {page}
    </Layout>
  )
}