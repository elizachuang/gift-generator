// Builds a Google Shopping search link for a gift. This is a normal link, not an API call.
// Google shows shops and prices for the visitor's own country.
export function buyLink(gift) {
  return `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(gift.searchQuery)}`
}
