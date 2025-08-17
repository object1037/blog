import { useState } from 'hono/jsx'
import { CopyButton, type CopyButtonStyle } from './copyButton'

export type ImageFinderStyle = CopyButtonStyle & {
  finder: string
  searchBox: string
}

export const ImageFinder = ({
  style,
  images,
}: {
  style: ImageFinderStyle
  images: string[]
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { finder, searchBox, ...buttonStyle } = style

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
            <li key={image}>
              <CopyButton image={image} style={buttonStyle} />
            </li>
          ))}
      </ul>
    </div>
  )
}
