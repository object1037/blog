import { Link, Outlet } from '@remix-run/react'

export default function BlogLayout() {
  return (
    <>
      <header>blog layout</header>
      <main>
        <Link to="/">Home</Link>
        <Outlet />
      </main>
    </>
  )
}
