import type { ValidateError } from '@markdoc/markdoc'
import { Editor } from '../islands/editor'
import { Meta } from './meta'

export const EditPage = ({
  content,
  errors,
}: {
  content: string
  errors: ValidateError[]
}) => {
  return (
    <>
      <Meta title="Edit Post" />
      <Editor initialValue={content} />
      {errors.length > 0 && (
        <ul>
          {errors.map(({ error }) => (
            <li key={error.message}>
              [{error.id}]: {error.message}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
