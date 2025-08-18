import { css, cx } from 'hono/css'
import { useState } from 'hono/jsx'
import { Upload } from 'lucide'
import { LucideIcon } from '../components/lucideIcon'
import { convertToWebp } from '../lib/webp.client'
import { ImageFinder } from './imageFinder'

export const ImageWidget = ({ images: initImages }: { images: string[] }) => {
  const [images, setImages] = useState(initImages)
  const [copied, setCopied] = useState(false)

  const wrapperStyle = css`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: start;
  `
  const uploadButtonStyle = css`
    display: inline-block;
    font-size: 1.25rem;
    padding: 0.625rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  `
  const normalColor = css`
    border: 1px solid #e5e5e5;
    &:hover {
      border-color: #a3a3a3;
    }
  `
  const copiedColor = css`
    background-color: #d1fae5;
    border: 1px solid #6ee7b7;
    &:hover {
      border-color: #6ee7b7;
    }
  `
  const h2Style = css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  `

  const addImage = async (e: Event) => {
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

    setImages((prev) => [...prev, webp.name])
    await navigator.clipboard.writeText(`/images/${webp.name}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <h2 class={h2Style}>Image</h2>
      <div class={wrapperStyle}>
        <ImageFinder images={images} setImages={setImages} />
        <form>
          <label
            for="fileInput"
            class={cx(uploadButtonStyle, copied ? copiedColor : normalColor)}
          >
            <LucideIcon icon={Upload} title="Add image" />
          </label>
          <input
            name="file"
            id="fileInput"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={addImage}
            hidden
          />
        </form>
      </div>
    </>
  )
}
