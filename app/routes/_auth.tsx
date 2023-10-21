import { Form, Outlet } from '@remix-run/react'

export default function AuthLayout() {
  return (
    <div>
      <h1>Auth Layout</h1>
      <Form action="logout" method="post">
        <button>Logout</button>
      </Form>
      <Outlet />
    </div>
  )
}
