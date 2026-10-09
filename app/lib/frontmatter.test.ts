import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { parseYaml } from './frontmatter'

describe('parseYaml', () => {
  it('preserves colons inside values', () => {
    assert.deepEqual(parseYaml('title: Foo: Bar\ndescription: a: b'), {
      title: 'Foo: Bar',
      description: 'a: b',
    })
  })

  it('drops empty dash-list items', () => {
    assert.deepEqual(parseYaml('tags:\n- a\n-\n- b'), { tags: ['a', 'b'] })
  })
})
