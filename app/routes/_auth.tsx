import { Outlet } from '@remix-run/react'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'

export default function AuthLayout() {
  return (
    <>
      <Header dashboard />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
