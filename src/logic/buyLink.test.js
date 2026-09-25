import { describe, expect, it } from 'vitest'
import { buyLink } from './buyLink.js'

describe('buyLink', () => {
  it('builds a Google Shopping search link from the search query', () => {
    expect(buyLink({ searchQuery: 'soy candle' })).toBe(
      'https://www.google.com/search?tbm=shop&q=soy%20candle',
    )
  })

  it('encodes special characters so the link stays valid', () => {
    expect(buyLink({ searchQuery: 'mug & tea?' })).toBe(
      'https://www.google.com/search?tbm=shop&q=mug%20%26%20tea%3F',
    )
  })
})
