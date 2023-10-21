import { Outlet } from '@remix-run/react'

export default function AuthLayout() {
  return (
    <div>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  )
}
