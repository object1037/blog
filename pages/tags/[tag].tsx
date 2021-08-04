import { useRouter } from 'next/router'

export default function TagPage() {
  const router = useRouter()
  const { tag } = router.query

  return <p>Post: {tag}</p>
}