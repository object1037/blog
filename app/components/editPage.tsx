import { grid } from '../../styled-system/patterns'
import { Editor } from '../islands/editor'
import { ImageWidget } from '../islands/imageWidget'
import { Meta } from './meta'
import { Preview } from './preview'

export const head = {
  heading: 'New Post',
  isDashboard: true,
}

export const EditPage = ({
  content,
  errors,
  images,
}: {
  content: string
  errors: string[]
  images: string[]
}) => {
  const containerStyle = grid({
    position: 'relative',
    w: '[calc(100svw - 1.75rem)]',
    maxW: '6xl',
    left: '[50%]',
    transform: 'translateX(-50%)',
    columns: 2,
  })

  return (
    <>
      <Meta title="Edit Post" />
      <div class={containerStyle}>
        <Editor initialValue={content} />
        <Preview content={content} errors={errors} />
      </div>
      <ImageWidget images={images} />
    </>
  )
}
