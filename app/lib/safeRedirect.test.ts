import { describe, expect, it } from 'vitest'
import { isSafeNextPath, resolveSafeNextPath } from './safeRedirect'

describe('isSafeNextPath', () => {
  it('rejects absolute external URLs', () => {
    expect(isSafeNextPath('https://evil.example/phish')).toBe(false)
  })

  it('rejects protocol-relative URLs', () => {
    expect(isSafeNextPath('//evil.example/phish')).toBe(false)
  })

  it('accepts same-origin paths', () => {
    expect(isSafeNextPath('/dashboard')).toBe(true)
  })

  it('rejects missing values', () => {
    expect(isSafeNextPath(undefined)).toBe(false)
    expect(isSafeNextPath('')).toBe(false)
  })

  it('rejects backslash and whitespace tricks', () => {
    expect(isSafeNextPath('/\\evil')).toBe(false)
    expect(isSafeNextPath('/dash board')).toBe(false)
  })

  it('rejects scheme URLs', () => {
    expect(isSafeNextPath('javascript:alert(1)')).toBe(false)
  })

  it('accepts nested same-origin paths with query', () => {
    expect(isSafeNextPath('/posts/20250101?x=1')).toBe(true)
  })
})

describe('resolveSafeNextPath', () => {
  it('falls back to /dashboard for external URLs', () => {
    expect(resolveSafeNextPath('https://evil.example/phish')).toBe('/dashboard')
  })
})
