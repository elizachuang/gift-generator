import { describe, expect, it } from 'vitest'
import gifts from '../data/gifts.json'
import { BUDGETS, OCCASIONS } from '../data/options.js'
import { findGifts, MAX_RESULTS } from './findGifts.js'

// Small made-up gifts so each test is easy to follow.
function makeGift(id, overrides = {}) {
  return {
    id,
    price: 30,
    occasions: ['birthday'],
    recipients: ['close'],
    interests: ['any'],
    ...overrides,
  }
}

const idsOf = (list) => list.map((gift) => gift.id)

describe('findGifts', () => {
  it('returns only gifts that match the occasion and budget', () => {
    const testGifts = [
      makeGift('match'),
      makeGift('wrong-occasion', { occasions: ['christmas'] }),
      makeGift('too-cheap', { price: 10 }),
      makeGift('too-expensive', { price: 60 }),
    ]
    const result = findGifts({ occasion: 'birthday', budget: '20-50' }, testGifts)
    expect(idsOf(result)).toEqual(['match'])
  })

  it('returns an empty list when nothing matches', () => {
    const result = findGifts({ occasion: 'farewell', budget: '20-50' }, [makeGift('a')])
    expect(result).toEqual([])
  })

  it('returns an empty list when occasion or budget is missing or unknown', () => {
    const testGifts = [makeGift('a')]
    expect(findGifts({ budget: '20-50' }, testGifts)).toEqual([])
    expect(findGifts({ occasion: 'birthday' }, testGifts)).toEqual([])
    expect(findGifts({ occasion: 'birthday', budget: 'nope' }, testGifts)).toEqual([])
  })

  it('puts a price on a band edge into the higher band (min <= price < max)', () => {
    const testGifts = [makeGift('twenty', { price: 20 })]
    expect(findGifts({ occasion: 'birthday', budget: 'under-20' }, testGifts)).toEqual([])
    expect(idsOf(findGifts({ occasion: 'birthday', budget: '20-50' }, testGifts))).toEqual([
      'twenty',
    ])
  })

  it('ranks gifts for the chosen recipient first', () => {
    const testGifts = [
      makeGift('for-close', { recipients: ['close'], price: 45 }),
      makeGift('for-coworker', { recipients: ['coworker'], price: 25 }),
    ]
    const result = findGifts(
      { occasion: 'birthday', budget: '20-50', recipient: 'coworker' },
      testGifts,
    )
    expect(idsOf(result)).toEqual(['for-coworker', 'for-close'])
  })

  it('ranks gifts matching a known interest first', () => {
    const testGifts = [
      makeGift('general', { interests: ['any'], price: 45 }),
      makeGift('cooking', { interests: ['cooking'], price: 25 }),
    ]
    const result = findGifts(
      { occasion: 'birthday', budget: '20-50', interest: 'cooking' },
      testGifts,
    )
    expect(idsOf(result)).toEqual(['cooking', 'general'])
  })

  it('prefers general "any" gifts when the giver doesn\'t know the interest', () => {
    const testGifts = [
      makeGift('niche', { interests: ['games'], price: 45 }),
      makeGift('general', { interests: ['any'], price: 25 }),
    ]
    const result = findGifts({ occasion: 'birthday', budget: '20-50', interest: 'any' }, testGifts)
    expect(idsOf(result)).toEqual(['general', 'niche'])
  })

  it('breaks ties by putting the pricier gift first', () => {
    const testGifts = [
      makeGift('cheaper', { price: 22 }),
      makeGift('pricier', { price: 48 }),
      makeGift('middle', { price: 35 }),
    ]
    const result = findGifts({ occasion: 'birthday', budget: '20-50' }, testGifts)
    expect(idsOf(result)).toEqual(['pricier', 'middle', 'cheaper'])
  })

  it(`returns at most ${MAX_RESULTS} gifts`, () => {
    const testGifts = Array.from({ length: 10 }, (_, i) => makeGift(`gift-${i}`))
    expect(findGifts({ occasion: 'birthday', budget: '20-50' }, testGifts)).toHaveLength(
      MAX_RESULTS,
    )
  })

  it('does not change the original gift list', () => {
    const testGifts = [makeGift('a', { price: 21 }), makeGift('b', { price: 49 })]
    findGifts({ occasion: 'birthday', budget: '20-50' }, testGifts)
    expect(idsOf(testGifts)).toEqual(['a', 'b'])
  })

  // Uses the real gift list: every occasion and budget should give at least one idea.
  const pairs = OCCASIONS.flatMap((occasion) => BUDGETS.map((budget) => ({ occasion, budget })))
  it.each(pairs)(
    'finds at least one real gift for $occasion.label at $budget.label',
    ({ occasion, budget }) => {
      const result = findGifts({ occasion: occasion.id, budget: budget.id }, gifts)
      expect(result.length).toBeGreaterThanOrEqual(1)
    },
  )
})
