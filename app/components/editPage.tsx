import type { ValidateError } from '@markdoc/markdoc'
import { Editor } from '../islands/editor'

export const EditPage = ({
  content,
  errors,
}: {
  content: string
  errors: ValidateError[]
}) => {
  return (
    <>
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
