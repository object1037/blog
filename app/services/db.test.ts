import { describe, expect, it } from 'vitest'
import { getPostsWithTag, getTags } from './db'

const collectSql = () => {
  const seen: string[] = []
  const stmt = {
    bind: (..._params: unknown[]) => ({
      all: async () => ({ results: [] }),
      run: async () => ({}),
      first: async () => null,
      raw: async () => [],
    }),
  }
  const fakeDb = {
    prepare: (sql: string) => {
      seen.push(sql)
      return stmt
    },
    batch: async () => [],
    exec: async () => ({}),
  } as unknown as D1Database
  return { fakeDb, seen }
}

describe('getPostsWithTag', () => {
  it('scopes tag listings to public posts', async () => {
    const { fakeDb, seen } = collectSql()

    await getPostsWithTag(fakeDb, 'tech')

    const sql = seen.join('\n')
    expect(sql).toMatch(/"posts"\."public" = \?/)
  })
})

describe('getTags', () => {
  it('counts only tags of public posts', async () => {
    const { fakeDb, seen } = collectSql()

    await getTags(fakeDb)

    const sql = seen.join('\n')
    expect(sql).toMatch(/inner join "posts"/)
    expect(sql).toMatch(/"posts"\."public" = \?/)
  })
})
