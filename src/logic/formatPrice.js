const euro = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

// Prices in gifts.json are estimates, so they're shown as "About €35".
export function formatPrice(price) {
  return `About ${euro.format(price)}`
}
