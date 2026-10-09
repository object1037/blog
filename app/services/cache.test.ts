import { describe, expect, it } from 'vitest'
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

    expect(deleted).toEqual([POST_CACHE_NAME])
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

    expect(deleted).toEqual([IMAGE_CACHE_NAME])
  })

  it('resolves when the cache backend is unavailable', async () => {
    const failingCaches = {
      delete: async (_name: string) => {
        throw new Error("Failed to execute 'delete' on 'CacheStorage'")
      },
    }

    await expect(purgePostCache(failingCaches)).resolves.toBeUndefined()
    await expect(purgeImageCache(failingCaches)).resolves.toBeUndefined()
  })

  it('resolves when there is no caches global', async () => {
    await expect(purgePostCache(undefined)).resolves.toBeUndefined()
  })
})
