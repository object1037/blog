import { css, cx } from '../../styled-system/css'
import { hstack } from '../../styled-system/patterns'
import { Editor } from '../islands/editor'
import { ImageWidget } from '../islands/imageWidget'
import { Meta } from './meta'

export const EditPage = ({
  content,
  errors,
}: {
  content: string
  errors: string[]
}) => {
  const editorCommon = css({
    pos: 'absolute',
    inset: '0',
    w: 'full',
    h: 'full',
    p: '4',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    rounded: 'lg',
    fontFamily: 'mono',
  })
  const editorStyle = {
    container: css({
      pos: 'relative',
      w: 'full',
      h: '3xl',
      overflow: 'auto',
      rounded: 'lg',
      transition: 'colors',
      borderWidth: '[1px]',
      borderColor: 'neutral.200',
      '&:has(textarea:focus-visible)': {
        borderColor: 'neutral.400',
      },
    }),
    pre: cx(
      editorCommon,
      css({
        pointerEvents: 'none',
      }),
    ),
    textarea: cx(
      editorCommon,
      css({
        bg: 'transparent',
        color: 'transparent',
        caretColor: 'black',
        resize: 'none',
        overflow: 'hidden',
        _focusVisible: {
          outline: 'none',
        },
      }),
    ),
  }
  const imageWidgetStyle = {
    wrapper: hstack({
      justify: 'space-between',
    }),
    finder: css({
      flexGrow: '1',
    }),
    searchBox: css({
      p: '2',
      w: 'full',
    }),
    copyButton: css({
      transition: 'colors',
      p: '2',
      w: 'full',
      textAlign: 'left',
      cursor: 'copy',
    }),
    normalBg: css({
      bg: { base: 'transparent', _hover: 'neutral.200' },
    }),
    copiedBg: css({
      bg: { base: 'emerald.100', _hover: 'emerald.100' },
    }),
    uploadButton: css({
      display: 'inline-block',
      py: '2',
      px: '4',
      transition: 'colors',
      borderWidth: '1px',
      borderColor: { base: 'neutral.200', _hover: 'neutral.400' },
      rounded: 'lg',
      cursor: 'pointer',
    }),
  }

  return (
    <>
      <Meta title="Edit Post" />
      <Editor initialValue={content} style={editorStyle} />
      {errors.length > 0 && (
        <ul>
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      <ImageWidget style={imageWidgetStyle} />
    </>
  )
}
