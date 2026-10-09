import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isSafeNextPath, resolveSafeNextPath } from './safeRedirect'

describe('isSafeNextPath', () => {
  it('rejects absolute external URLs', () => {
    assert.equal(isSafeNextPath('https://evil.example/phish'), false)
  })

  it('rejects protocol-relative URLs', () => {
    assert.equal(isSafeNextPath('//evil.example/phish'), false)
  })

  it('accepts same-origin paths', () => {
    assert.equal(isSafeNextPath('/dashboard'), true)
  })

  it('rejects missing values', () => {
    assert.equal(isSafeNextPath(undefined), false)
    assert.equal(isSafeNextPath(''), false)
  })

  it('rejects backslash and whitespace tricks', () => {
    assert.equal(isSafeNextPath('/\\evil'), false)
    assert.equal(isSafeNextPath('/dash board'), false)
  })

  it('rejects scheme URLs', () => {
    assert.equal(isSafeNextPath('javascript:alert(1)'), false)
  })

  it('accepts nested same-origin paths with query', () => {
    assert.equal(isSafeNextPath('/posts/20250101?x=1'), true)
  })
})

describe('resolveSafeNextPath', () => {
  it('falls back to /dashboard for external URLs', () => {
    assert.equal(
      resolveSafeNextPath('https://evil.example/phish'),
      '/dashboard',
    )
  })
})
