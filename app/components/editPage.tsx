import { css } from '../../styled-system/css'
import { grid } from '../../styled-system/patterns'
import { DeletePostButton } from '../islands/deletePostButton'
import { Editor } from '../islands/editor'
import { ImageWidget } from '../islands/imageWidget'
import { Meta } from './meta'
import { Preview } from './preview'

export const head = {
  heading: 'New Post',
  isDashboard: true,
}

export const EditPage = ({
  id,
  content,
  errors,
  images,
}: {
  id: number | undefined
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
    mb: '6',
  })
  const dangerZoneStyle = css({
    borderTopWidth: '1px',
    borderColor: 'neutral.200',
    my: '12',
    py: '6',
  })

  return (
    <>
      <Meta title="Edit Post" />
      <div class={containerStyle}>
        <Editor initialValue={content} id={id} />
        <Preview content={content} errors={errors} />
      </div>
      <ImageWidget images={images} />
      {id && (
        <div class={dangerZoneStyle}>
          <DeletePostButton id={id} />
        </div>
      )}
    </>
  )
}
