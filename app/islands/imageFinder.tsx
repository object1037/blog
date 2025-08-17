import { useState } from 'hono/jsx'
import { CopyButton, type CopyButtonStyle } from './copyButton'

export type ImageFinderStyle = CopyButtonStyle & {
  finder: string
  searchBox: string
  item: string
}

export const ImageFinder = ({
  style,
  images,
  setImages,
}: {
  style: ImageFinderStyle
  images: string[]
  setImages: (u: (c: string[]) => string[]) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { finder, searchBox, item, ...buttonStyle } = style

  return (
    <div class={finder}>
      <input
        type="search"
        name="search"
        placeholder="Search images"
        class={searchBox}
        value={searchTerm}
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      />
      <ul>
        {images
          .filter((image) =>
            image.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((image) => (
            <li key={image} class={item}>
              <CopyButton
                image={image}
                style={buttonStyle}
                setImages={setImages}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
