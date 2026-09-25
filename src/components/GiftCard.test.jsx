import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import GiftCard from './GiftCard.jsx'

const gift = {
  id: 'soy-candle',
  name: 'Soy candle',
  description: 'A hand-poured candle.',
  whySpecial: 'Pick a scent that means something to you both.',
  price: 15,
  searchQuery: 'soy candle',
}

describe('GiftCard', () => {
  it('shows the name, price, description and why it feels special', () => {
    render(<GiftCard gift={gift} />)
    expect(screen.getByRole('heading', { name: 'Soy candle' })).toBeInTheDocument()
    expect(screen.getByText('About €15')).toBeInTheDocument()
    expect(screen.getByText('A hand-poured candle.')).toBeInTheDocument()
    expect(screen.getByText('Pick a scent that means something to you both.')).toBeInTheDocument()
  })

  it('links to a Google Shopping search in a new tab', () => {
    render(<GiftCard gift={gift} />)
    const link = screen.getByRole('link', { name: /Find in shops.*Soy candle.*new tab/ })
    expect(link).toHaveAttribute('href', 'https://www.google.com/search?tbm=shop&q=soy%20candle')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
