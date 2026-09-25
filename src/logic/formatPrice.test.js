import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice.js'

describe('formatPrice', () => {
  it('shows an estimated euro price without cents', () => {
    expect(formatPrice(35)).toBe('About €35')
    expect(formatPrice(120)).toBe('About €120')
  })
})
