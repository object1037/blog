import { convertToWebp } from '../lib/webp'
import { ImageFinder, type ImageFinderStyle } from './imageFinder'

export const ImageWidget = ({
  style,
}: {
  style: ImageFinderStyle & {
    wrapper: string
    uploadButton: string
  }
}) => {
  const images = ['hi', 'hu']
  const { wrapper, uploadButton, ...searchStyle } = style

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

    await navigator.clipboard.writeText(webp.name)
  }

  return (
    <div class={wrapper}>
      <ImageFinder style={searchStyle} images={images} />
      <form>
        <label for="fileInput" class={uploadButton}>
          New Image
        </label>
        <input
          name="file"
          id="fileInput"
          type="file"
          accept="image/png, image/jpeg"
          onChange={addImage}
          hidden
        />
      </form>
    </div>
  )
}
