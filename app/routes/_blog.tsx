import { Outlet } from '@remix-run/react'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'

export default function BlogLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
