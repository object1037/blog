export const POST_CACHE_NAME = 'post-cache'
export const IMAGE_CACHE_NAME = 'image-cache'

type CacheDeleter = Pick<CacheStorage, 'delete'>

const resolveCaches = (cachesLike?: CacheDeleter): CacheDeleter | undefined => {
  if (cachesLike) {
    return cachesLike
  }
  return typeof caches !== 'undefined' ? caches : undefined
}

const purgeCache = async (
  name: string,
  cachesLike?: CacheDeleter,
): Promise<void> => {
  try {
    await resolveCaches(cachesLike)?.delete(name)
  } catch (e) {
    console.error(`Failed to purge ${name}:`, e)
  }
}

export const purgePostCache = async (
  cachesLike?: CacheDeleter,
): Promise<void> => {
  await purgeCache(POST_CACHE_NAME, cachesLike)
}

export const purgeImageCache = async (
  cachesLike?: CacheDeleter,
): Promise<void> => {
  await purgeCache(IMAGE_CACHE_NAME, cachesLike)
}
