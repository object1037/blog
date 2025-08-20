import { css } from 'hono/css'
import { Trash } from 'lucide'
import { LucideIcon } from '../components/lucideIcon'

export const DeletePostButton = ({ id }: { id: number }) => {
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/posts/${id}`, {
        method: 'DELETE',
      })
    }
  }

  const buttonStyle = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #ef4444;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color background-color;
    color: #ef4444;
    &:hover {
      color: #fafafa;
      background-color: #ef4444;
    }
  `

  return (
    <button type="button" onClick={() => handleDelete(id)} class={buttonStyle}>
      <LucideIcon icon={Trash} title="Delete Post" /> DELETE POST
    </button>
  )
}
