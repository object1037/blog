import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { IMAGE_CACHE_NAME, POST_CACHE_NAME, purgePostCache } from './cache'

describe('purgePostCache', () => {
  it('deletes the post-cache store', async () => {
    const deleted: string[] = []
    const fakeCaches = {
      delete: async (name: string) => {
        deleted.push(name)
        return true
      },
    }

    await purgePostCache(fakeCaches)

    assert.deepEqual(deleted, [POST_CACHE_NAME])
  })

  it('exposes the image cache name for image writes', () => {
    assert.equal(IMAGE_CACHE_NAME, 'image-cache')
  })
})
