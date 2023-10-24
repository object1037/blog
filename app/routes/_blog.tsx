import { Link, Outlet } from '@remix-run/react'

export default function BlogLayout() {
  return (
    <div>
      <h1>Blog Layout</h1>
      <Link to="/">Home</Link>
      <Outlet />
    </div>
  )
}
