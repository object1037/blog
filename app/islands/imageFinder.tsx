import { useState } from 'hono/jsx'

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
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']

  return (
    <div class={wrapper}>
      {images.map((image) => (
        <CopyButton key={image} image={image} style={buttonStyle} />
      ))}
    </div>
  )
}
