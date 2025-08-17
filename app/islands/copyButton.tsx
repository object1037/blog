import { useState } from 'hono/jsx'

export type CopyButtonStyle = {
  copyButton: string
  deleteButton: string
  normalBg: string
  copiedBg: string
}

export const CopyButton = ({
  image,
  style,
  setImages,
}: {
  image: string
  style: CopyButtonStyle
  setImages: (u: (c: string[]) => string[]) => void
}) => {
  const [copied, setCopied] = useState(false)
  const { copyButton, deleteButton, normalBg, copiedBg } = style

  const handleCopy = (image: string) => {
    navigator.clipboard.writeText(`/images/${image}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  const handleDelete = async (image: string) => {
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
        class={`${copyButton} ${copied ? copiedBg : normalBg}`}
      >
        {image}
      </button>
      <button
        type="button"
        onClick={() => handleDelete(image)}
        class={deleteButton}
      >
        x
      </button>
    </>
  )
}
