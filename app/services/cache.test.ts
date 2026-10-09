import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  IMAGE_CACHE_NAME,
  POST_CACHE_NAME,
  purgeImageCache,
  purgePostCache,
} from './cache'

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
})

describe('purgeImageCache', () => {
  it('deletes the image-cache store', async () => {
    const deleted: string[] = []
    const fakeCaches = {
      delete: async (name: string) => {
        deleted.push(name)
        return true
      },
    }

    await purgeImageCache(fakeCaches)

    assert.deepEqual(deleted, [IMAGE_CACHE_NAME])
  })
})
