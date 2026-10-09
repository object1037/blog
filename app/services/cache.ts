export const POST_CACHE_NAME = 'post-cache'
export const IMAGE_CACHE_NAME = 'image-cache'

export const purgePostCache = async (
  cachesLike: Pick<CacheStorage, 'delete'> = caches,
): Promise<void> => {
  await cachesLike.delete(POST_CACHE_NAME)
}

export const purgeImageCache = async (
  cachesLike: Pick<CacheStorage, 'delete'> = caches,
): Promise<void> => {
  await cachesLike.delete(IMAGE_CACHE_NAME)
}
