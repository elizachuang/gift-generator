import { BUDGETS } from '../data/options.js'

export const MAX_RESULTS = 6

// Points added to a gift's score. A gift must always match the occasion and budget;
// these only decide the order of the gifts that pass.
const RECIPIENT_POINTS = 2
const INTEREST_POINTS = 2
const GENERAL_GIFT_POINTS = 1 // gift tagged "any" when the giver doesn't know the interest

function scoreGift(gift, { recipient, interest }) {
  let score = 0
  if (recipient && gift.recipients.includes(recipient)) score += RECIPIENT_POINTS

  const knowsInterest = interest && interest !== 'any'
  if (knowsInterest && gift.interests.includes(interest)) score += INTEREST_POINTS
  if (!knowsInterest && gift.interests.includes('any')) score += GENERAL_GIFT_POINTS

  return score
}

/**
 * Picks the best gifts for the quiz answers.
 * answers: { occasion, budget, recipient?, interest? } using ids from options.js
 * Returns up to `limit` gifts, best first. Ties go to the pricier gift, so the
 * suggestion doesn't feel cheap for the chosen budget.
 */
export function findGifts(answers, gifts, limit = MAX_RESULTS) {
  const budget = BUDGETS.find((band) => band.id === answers.budget)
  if (!answers.occasion || !budget) return []

  return gifts
    .filter((gift) => gift.occasions.includes(answers.occasion))
    .filter((gift) => gift.price >= budget.min && gift.price < budget.max)
    .map((gift) => ({ gift, score: scoreGift(gift, answers) }))
    .sort((a, b) => b.score - a.score || b.gift.price - a.gift.price)
    .slice(0, limit)
    .map(({ gift }) => gift)
}
