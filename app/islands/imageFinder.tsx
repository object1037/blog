import { useState } from 'hono/jsx'
import { convertToWebp } from '../lib/webp'

const CopyButton = ({
  image,
  style,
}: {
  image: string
  style: {
    button: string
    normalBg: string
    copiedBg: string
  }
}) => {
  const { button, normalBg, copiedBg } = style
  const [copied, setCopied] = useState(false)

  const handleClick = (image: string) => {
    navigator.clipboard.writeText(image).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <button
      type="button"
      onClick={() => handleClick(image)}
      class={`${button} ${copied ? copiedBg : normalBg}`}
    >
      {image}
    </button>
  )
}

export const ImageFinder = ({
  style,
}: {
  style: {
    wrapper: string
    button: string
    normalBg: string
    copiedBg: string
  }
}) => {
  const { wrapper, ...buttonStyle } = style

  const uploadHandler = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) {
      console.error('No file selected')
      return
    }

    const webp = await convertToWebp(file)
    if (!webp) {
      console.error('Failed to convert to WebP')
      return
    }

    const formData = new FormData()
    formData.append('file', webp)
    try {
      const res = await fetch(`/images/${webp.name}`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        throw new Error('Failed to upload image')
      }
    } catch (e) {
      console.error(e)
    }

    await navigator.clipboard.writeText(webp.name)
  }

  return (
    <div class={wrapper}>
      <div>Image</div>
      <form>
        <label for="fileInput">Add</label>
        <input
          name="file"
          id="fileInput"
          type="file"
          accept="image/png, image/jpeg"
          onChange={uploadHandler}
        />
      </form>
    </div>
  )
}
