import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import GiftQuizForm from './GiftQuizForm.jsx'

const group = (name) => screen.getByRole('group', { name })
const submitButton = () => screen.getByRole('button', { name: 'Find gift ideas' })

function setup(props = {}) {
  const onSubmit = vi.fn()
  const user = userEvent.setup()
  render(<GiftQuizForm onSubmit={onSubmit} {...props} />)
  return { onSubmit, user }
}

describe('GiftQuizForm', () => {
  it('gives every question and option an accessible label', () => {
    setup()
    for (const name of [
      "What's the occasion?",
      'Who is it for?',
      "What's your budget?",
      'What are they into? (optional)',
    ]) {
      expect(group(name)).toBeInTheDocument()
    }
    expect(screen.getByRole('radio', { name: 'Birthday' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Under €20' })).toBeInTheDocument()
  })

  it('starts with "I don\'t know" selected for the optional interest', () => {
    setup()
    expect(screen.getByRole('radio', { name: "I don't know" })).toBeChecked()
  })

  it('submits the chosen answers', async () => {
    const { onSubmit, user } = setup()
    await user.click(screen.getByRole('radio', { name: 'Housewarming' }))
    await user.click(screen.getByRole('radio', { name: 'Coworker' }))
    await user.click(screen.getByRole('radio', { name: '€20–50' }))
    await user.click(screen.getByRole('radio', { name: 'Cooking and food' }))
    await user.click(submitButton())

    expect(onSubmit).toHaveBeenCalledWith({
      occasion: 'housewarming',
      recipient: 'coworker',
      budget: '20-50',
      interest: 'cooking',
    })
  })

  it('shows an error for each unanswered question and does not submit', async () => {
    const { onSubmit, user } = setup()
    await user.click(submitButton())

    expect(onSubmit).not.toHaveBeenCalled()
    expect(group("What's the occasion?")).toHaveAccessibleDescription('Please pick an occasion.')
    expect(group('Who is it for?')).toHaveAccessibleDescription('Please pick who the gift is for.')
    expect(group("What's your budget?")).toHaveAccessibleDescription('Please pick a budget.')
  })

  it('moves focus to the first unanswered question', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('radio', { name: 'Birthday' }))
    await user.click(submitButton())
    expect(screen.getByRole('radio', { name: 'Close friend or family' })).toHaveFocus()
  })

  it("clears a question's error once it is answered", async () => {
    const { user } = setup()
    await user.click(submitButton())
    await user.click(screen.getByRole('radio', { name: 'Christmas' }))
    expect(screen.queryByText('Please pick an occasion.')).not.toBeInTheDocument()
    expect(screen.getByText('Please pick a budget.')).toBeInTheDocument()
  })

  it('can be filled in and submitted with the keyboard only', async () => {
    const { onSubmit, user } = setup()
    // Tab to each question, Space picks the focused option, Enter submits.
    await user.tab()
    await user.keyboard(' ')
    await user.tab()
    await user.keyboard(' ')
    await user.tab()
    await user.keyboard(' ')
    await user.keyboard('{Enter}')

    expect(onSubmit).toHaveBeenCalledWith({
      occasion: 'birthday',
      recipient: 'close',
      budget: 'under-20',
      interest: 'any',
    })
  })

  it('only offers "Baby or new parent" for a baby shower', async () => {
    const { user } = setup()
    const babyOption = () => screen.queryByRole('radio', { name: 'Baby or new parent' })

    expect(babyOption()).not.toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Baby shower' }))
    expect(babyOption()).toBeInTheDocument()
  })

  it('clears "Baby or new parent" when the occasion changes away from baby shower', async () => {
    const { onSubmit, user } = setup()
    await user.click(screen.getByRole('radio', { name: 'Baby shower' }))
    await user.click(screen.getByRole('radio', { name: 'Baby or new parent' }))
    await user.click(screen.getByRole('radio', { name: 'Birthday' }))
    await user.click(screen.getByRole('radio', { name: 'Under €20' }))
    await user.click(submitButton())

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Please pick who the gift is for.')).toBeInTheDocument()
  })

  it('keeps earlier answers when given initialAnswers', () => {
    setup({ initialAnswers: { occasion: 'christmas', recipient: 'close', budget: '50-100' } })
    expect(screen.getByRole('radio', { name: 'Christmas' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Close friend or family' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '€50–100' })).toBeChecked()
  })
})
