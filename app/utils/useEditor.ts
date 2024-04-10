import { useEffect, useMemo, useState } from 'react'

import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { Annotation, EditorState } from '@codemirror/state'
import {
  EditorView,
  type ViewUpdate,
  drawSelection,
  highlightSpecialChars,
  keymap,
} from '@codemirror/view'

const External = Annotation.define<boolean>()

export const useEditor = ({
  value,
  container,
  onChange,
}: {
  value?: string
  container: HTMLDivElement | null
  onChange: (value: string, viewUpdate: ViewUpdate) => void
}) => {
  const [parent, setParent] = useState<HTMLDivElement | null>()
  const [state, setState] = useState<EditorState>()
  const [view, setView] = useState<EditorView>()

  const updateListener = useMemo(
    () =>
      EditorView.updateListener.of((vu) => {
        if (
          vu.docChanged &&
          typeof onChange === 'function' &&
          !vu.transactions.some((tr) => tr.annotation(External))
        ) {
          const value = vu.state.doc.toString()
          onChange(value, vu)
        }
      }),
    [onChange],
  )

  useEffect(() => {
    setParent(container)
  }, [container])

  // biome-ignore lint/correctness/useExhaustiveDependencies: exhaustive deps will cause infinite loop.
  useEffect(() => {
    if (parent && !state) {
      const stateCurrent = EditorState.create({
        doc: value ?? '',
        extensions: [
          updateListener,
          markdown({ codeLanguages: languages }),
          highlightSpecialChars(),
          history(),
          drawSelection(),
          // @ts-expect-error - this error only occurs with exactOptionalPropertyTypes enabled.
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          keymap.of([...defaultKeymap, ...historyKeymap]),
        ],
      })
      setState(stateCurrent)
      if (!view) {
        const viewCurrent = new EditorView({
          state: stateCurrent,
          parent,
        })

        setView(viewCurrent)
      }
    }
    return () => {
      if (view) {
        setState(undefined)
        setView(undefined)
      }
    }
  }, [parent, state, updateListener, view])

  useEffect(
    () => () => {
      if (view) {
        view.destroy()
        setView(undefined)
      }
    },
    [view],
  )

  useEffect(() => {
    if (value === undefined) {
      return
    }
    const currentValue = view?.state.doc.toString() ?? ''
    if (view && value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value },
        annotations: External.of(true),
      })
    }
  }, [value, view])

  return { state, view }
}
