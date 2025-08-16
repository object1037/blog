import { Editor } from '../islands/editor'
import { Meta } from './meta'

export const EditPage = ({
  content,
  errors,
}: {
  content: string
  errors: string[]
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
    </>
  )
}
