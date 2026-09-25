// The fixed answer choices for the gift quiz.
// Gifts in gifts.json must only use the ids listed here (a test checks this).

export const OCCASIONS = [
  { id: 'birthday', label: 'Birthday' },
  { id: 'baby-shower', label: 'Baby shower' },
  { id: 'farewell', label: 'Colleague farewell' },
  { id: 'housewarming', label: 'Housewarming' },
  { id: 'christmas', label: 'Christmas' },
]

export const RECIPIENTS = [
  { id: 'close', label: 'Close friend or family' },
  { id: 'coworker', label: 'Coworker' },
  { id: 'acquaintance', label: 'Acquaintance' },
  { id: 'new-parent', label: 'Baby or new parent' },
]

// Prices in euros. A price matches a band when min <= price < max.
export const BUDGETS = [
  { id: 'under-20', label: 'Under €20', min: 0, max: 20 },
  { id: '20-50', label: '€20–50', min: 20, max: 50 },
  { id: '50-100', label: '€50–100', min: 50, max: 100 },
  { id: '100-plus', label: '€100+', min: 100, max: Infinity },
]

// "any" marks a gift that suits most people, useful when the giver doesn't know their interests.
export const INTERESTS = [
  { id: 'any', label: "I don't know" },
  { id: 'cooking', label: 'Cooking and food' },
  { id: 'coffee-tea', label: 'Coffee or tea' },
  { id: 'reading', label: 'Reading' },
  { id: 'plants', label: 'Plants and gardening' },
  { id: 'games', label: 'Games and puzzles' },
  { id: 'travel', label: 'Travel' },
  { id: 'music', label: 'Music' },
  { id: 'art', label: 'Art and crafts' },
  { id: 'wellness', label: 'Relaxing and self-care' },
  { id: 'tech', label: 'Gadgets' },
]
