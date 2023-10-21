import { Form } from '@remix-run/react'

export default function Login() {
  return (
    <Form method="post" action="/auth/github">
      <button>Login with GitHub</button>
    </Form>
  )
}
