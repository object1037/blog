import { Editor } from '../islands/editor'
import { ImageWidget } from '../islands/imageWidget'
import { Meta } from './meta'

export const EditPage = ({
  content,
  errors,
  images,
}: {
  content: string
  errors: string[]
  images: string[]
}) => {
  return (
    <>
      <Meta title="Edit Post" />
      <Editor initialValue={content} />
      {errors.length > 0 && (
        <ul>
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      <ImageWidget images={images} />
    </>
  )
}
