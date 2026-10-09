export const isSafeNextPath = (value: string | undefined): value is string => {
  if (!value) {
    return false
  }
  if (!value.startsWith('/')) {
    return false
  }
  if (value.startsWith('//')) {
    return false
  }
  if (value.includes('\\')) {
    return false
  }
  for (const ch of value) {
    const code = ch.charCodeAt(0)
    if (code <= 0x1f || code === 0x7f) {
      return false
    }
  }
  if (/\s/.test(value)) {
    return false
  }
  return true
}

export const resolveSafeNextPath = (
  value: string | undefined,
  fallback = '/dashboard',
): string => {
  return isSafeNextPath(value) ? value : fallback
}
