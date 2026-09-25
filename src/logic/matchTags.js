import { INTERESTS, RECIPIENTS } from '../data/options.js'

const labelOf = (options, id) => options.find((option) => option.id === id)?.label

// Short labels explaining why a gift was picked: the recipient always matches (it's a filter),
// the interest only when the giver chose one and the gift has it.
export function matchTags(gift, answers) {
  const tags = [labelOf(RECIPIENTS, answers.recipient)]
  if (answers.interest && answers.interest !== 'any' && gift.interests.includes(answers.interest)) {
    tags.push(labelOf(INTERESTS, answers.interest))
  }
  return tags.filter(Boolean)
}
