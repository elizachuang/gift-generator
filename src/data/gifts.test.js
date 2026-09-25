import { describe, expect, it } from 'vitest'
import gifts from './gifts.json'
import { BUDGETS, INTERESTS, OCCASIONS, RECIPIENTS } from './options.js'

const ids = (options) => options.map((option) => option.id)
const inBudget = (gift, budget) => gift.price >= budget.min && gift.price < budget.max

describe('gifts.json', () => {
  it('has between 30 and 40 gifts', () => {
    expect(gifts.length).toBeGreaterThanOrEqual(30)
    expect(gifts.length).toBeLessThanOrEqual(40)
  })

  it('uses a unique id for every gift', () => {
    const allIds = gifts.map((gift) => gift.id)
    expect(new Set(allIds).size).toBe(allIds.length)
  })

  it.each(gifts)('$id has all required fields filled in', (gift) => {
    for (const field of ['id', 'name', 'description', 'whySpecial', 'searchQuery']) {
      expect(typeof gift[field], field).toBe('string')
      expect(gift[field].trim(), field).not.toBe('')
    }
    expect(gift.price).toBeGreaterThan(0)
    expect(gift.occasions.length).toBeGreaterThan(0)
    expect(gift.recipients.length).toBeGreaterThan(0)
    expect(gift.interests.length).toBeGreaterThan(0)
  })

  it.each(gifts)('$id only uses known occasion, recipient and interest ids', (gift) => {
    expect(ids(OCCASIONS)).toEqual(expect.arrayContaining(gift.occasions))
    expect(ids(RECIPIENTS)).toEqual(expect.arrayContaining(gift.recipients))
    expect(ids(INTERESTS)).toEqual(expect.arrayContaining(gift.interests))
  })

  const pairs = OCCASIONS.flatMap((occasion) => BUDGETS.map((budget) => ({ occasion, budget })))

  it.each(pairs)(
    'has at least one gift for $occasion.label at $budget.label',
    ({ occasion, budget }) => {
      const matches = gifts.filter(
        (gift) => gift.occasions.includes(occasion.id) && inBudget(gift, budget),
      )
      expect(matches.length).toBeGreaterThanOrEqual(1)
    },
  )
})
