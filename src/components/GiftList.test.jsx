import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import GiftList from './GiftList.jsx'

const makeGift = (id, name) => ({
  id,
  name,
  description: 'd',
  whySpecial: 'w',
  price: 30,
  searchQuery: name,
})

describe('GiftList', () => {
  it('renders one card per gift, in order', () => {
    render(<GiftList gifts={[makeGift('a', 'Mug'), makeGift('b', 'Book')]} />)
    const names = screen.getAllByRole('heading').map((heading) => heading.textContent)
    expect(names).toEqual(['Mug', 'Book'])
  })

  it('shows the empty state with a way back when there are no gifts', async () => {
    const onChangeAnswers = vi.fn()
    render(<GiftList gifts={[]} onChangeAnswers={onChangeAnswers} />)

    expect(screen.getByText('No exact match yet.')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Change answers' }))
    expect(onChangeAnswers).toHaveBeenCalledOnce()
  })
})

describe('GiftList best match and tags', () => {
  it('marks only the first gift as the best match', () => {
    render(<GiftList gifts={[makeGift('a', 'Mug'), makeGift('b', 'Book')]} />)
    const cards = screen.getAllByRole('article')
    expect(cards[0]).toHaveTextContent('Best match')
    expect(cards[1]).not.toHaveTextContent('Best match')
  })

  it('shows the "why it matched" tags as a labelled list', () => {
    render(<GiftList gifts={[makeGift('a', 'Mug')]} tagsFor={() => ['Coworker', 'Reading']} />)
    const tagList = screen.getByRole('list', { name: 'Matches' })
    expect(tagList).toHaveTextContent('Coworker')
    expect(tagList).toHaveTextContent('Reading')
  })
})
