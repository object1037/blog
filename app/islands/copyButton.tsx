import { useState } from 'hono/jsx'

export type CopyButtonStyle = {
  copyButton: string
  normalBg: string
  copiedBg: string
}

export const CopyButton = ({
  image,
  style,
}: {
  image: string
  style: CopyButtonStyle
}) => {
  const [copied, setCopied] = useState(false)
  const { copyButton, normalBg, copiedBg } = style

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
      class={`${copyButton} ${copied ? copiedBg : normalBg}`}
    >
      {image}
    </button>
  )
}
