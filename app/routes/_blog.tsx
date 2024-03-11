import { Outlet } from '@remix-run/react'

import { Header } from '~/components/header'

export default function BlogLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
