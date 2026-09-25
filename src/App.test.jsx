import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'
import gifts from './data/gifts.json'
import { findGifts } from './logic/findGifts.js'

async function fillAndSubmit(user) {
  await user.click(screen.getByRole('radio', { name: 'Birthday' }))
  await user.click(screen.getByRole('radio', { name: 'Coworker' }))
  await user.click(screen.getByRole('radio', { name: '€20–50' }))
  await user.click(screen.getByRole('button', { name: 'Find gift ideas' }))
}

describe('App', () => {
  it('shows the site heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Gift Generator' })).toBeInTheDocument()
  })

  it('shows the matching gift cards after the quiz is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)
    await fillAndSubmit(user)

    const expected = findGifts(
      { occasion: 'birthday', recipient: 'coworker', budget: '20-50', interest: 'any' },
      gifts,
    )
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(`${expected.length} gift ideas for you`)
    expect(heading).toHaveFocus()
    expect(screen.getByText('Birthday · Coworker · €20–50')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(
      expected.map((gift) => gift.name),
    )
    expect(screen.queryByRole('button', { name: 'Find gift ideas' })).not.toBeInTheDocument()
  })

  it('goes back to the form with the answers kept', async () => {
    const user = userEvent.setup()
    render(<App />)
    await fillAndSubmit(user)
    await user.click(screen.getByRole('button', { name: 'Change answers' }))

    expect(screen.getByRole('radio', { name: 'Birthday' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Birthday' })).toHaveFocus()
    expect(screen.getByRole('radio', { name: 'Coworker' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '€20–50' })).toBeChecked()
  })
})
