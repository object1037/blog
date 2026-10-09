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
})
