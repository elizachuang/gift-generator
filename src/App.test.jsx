import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('shows the site heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Gift Generator' })).toBeInTheDocument()
  })

  it('finds gift ideas after the quiz is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('radio', { name: 'Birthday' }))
    await user.click(screen.getByRole('radio', { name: 'Close friend or family' }))
    await user.click(screen.getByRole('radio', { name: '€20–50' }))
    await user.click(screen.getByRole('button', { name: 'Find gift ideas' }))

    expect(screen.getByRole('status')).toHaveTextContent(/We found [1-9]\d* gift ideas/)
  })
})
