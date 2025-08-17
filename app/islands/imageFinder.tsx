import { css } from 'hono/css'
import { useState } from 'hono/jsx'
import { CopyButton } from './copyButton'

export const ImageFinder = ({
  images,
  setImages,
}: {
  images: string[]
  setImages: (u: (c: string[]) => string[]) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const wrapperStyle = css`
    flex-grow: 1;
  `
  const searchBoxStyle = css`
    padding: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #e5e5e5;
    &:focus-visible {
      outline: none;
      border-color: #a3a3a3;
    }
    transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  `
  const itemStyle = css`
    display: flex;
    align-items: center;
  `

  return (
    <div class={wrapperStyle}>
      <input
        type="search"
        name="search"
        placeholder="Search images"
        class={searchBoxStyle}
        value={searchTerm}
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      />
      <ul>
        {images
          .filter((image) =>
            image.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((image) => (
            <li key={image} class={itemStyle}>
              <CopyButton image={image} setImages={setImages} />
            </li>
          ))}
      </ul>
    </div>
  )
}
