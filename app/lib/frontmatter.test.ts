import { describe, expect, it } from 'vitest'
import { parseYaml } from './frontmatter'

describe('parseYaml', () => {
  it('preserves colons inside values', () => {
    expect(parseYaml('title: Foo: Bar\ndescription: a: b')).toEqual({
      title: 'Foo: Bar',
      description: 'a: b',
    })
  })

  it('drops empty dash-list items', () => {
    expect(parseYaml('tags:\n- a\n-\n- b')).toEqual({ tags: ['a', 'b'] })
  })
})
