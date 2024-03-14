import { useRef } from 'react'

import { type ViewUpdate } from '@codemirror/view'

import { useEditor } from '~/utils/useEditor.client'

export const Editor = ({
  value,
  onChange,
}: {
  value?: string
  onChange: (value: string, viewUpdate: ViewUpdate) => void
}) => {
  const editor = useRef<HTMLDivElement>(null)
  useEditor({ value: value ?? '', container: editor.current, onChange })

  return <div ref={editor} />
}
