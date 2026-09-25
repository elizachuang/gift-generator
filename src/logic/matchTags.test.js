import { describe, expect, it } from 'vitest'
import { matchTags } from './matchTags.js'

const gift = { interests: ['cooking', 'any'] }

describe('matchTags', () => {
  it('always shows the recipient', () => {
    expect(matchTags(gift, { recipient: 'coworker', interest: 'any' })).toEqual(['Coworker'])
  })

  it('adds the interest when the gift matches it', () => {
    expect(matchTags(gift, { recipient: 'close', interest: 'cooking' })).toEqual([
      'Close friend or family',
      'Cooking and food',
    ])
  })

  it('leaves out an interest the gift does not match', () => {
    expect(matchTags(gift, { recipient: 'close', interest: 'music' })).toEqual([
      'Close friend or family',
    ])
  })
})
