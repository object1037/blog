import { css, cx } from 'hono/css'
import { useState } from 'hono/jsx'
import { Trash } from 'lucide'
import { LucideIcon } from '../components/lucideIcon'

export const ImageItem = ({
  image,
  setImages,
}: {
  image: string
  setImages: (u: (c: string[]) => string[]) => void
}) => {
  const [copied, setCopied] = useState(false)

  const transitionStyle = css`
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  `
  const copyBStyle = css`
    padding: 0.5rem;
    padding-right: 2rem;
    width: 100%;
    text-align: left;
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: copy;
    border-radius: 0.5rem;
    ${transitionStyle}
  `
  const deleteBStyle = css`
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #fafafa;
    &:hover {
      background-color: #fecaca;
    }
    ${transitionStyle}
  `
  const normalBg = css`
    &:hover {
      background-color: #e5e5e5;
    }
  `
  const copiedBg = css`
    background-color: #d1fae5;
    &:hover {
      background-color: #d1fae5;
    }
  `

  const handleCopy = async (image: string) => {
    await navigator.clipboard.writeText(`/images/${image}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  const handleDelete = async (image: string) => {
    if (!window.confirm(`Delete image ${image}?`)) {
      return
    }
    const res = await fetch(`/images/${image}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      console.error('Failed to delete image')
    }
    setImages((prev) => prev?.filter((img) => img !== image))
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleCopy(image)}
        class={cx(copyBStyle, copied ? copiedBg : normalBg)}
      >
        {image}
      </button>
      <button
        type="button"
        onClick={() => handleDelete(image)}
        class={deleteBStyle}
      >
        <LucideIcon icon={Trash} title="Delete" />
      </button>
    </>
  )
}
