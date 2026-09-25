import { useEffect, useRef, useState } from 'react'
import { BUDGETS, INTERESTS, OCCASIONS, RECIPIENTS } from '../data/options.js'
import ChoiceGroup from './ChoiceGroup.jsx'
import './GiftQuizForm.css'

const EMPTY_ANSWERS = { occasion: '', recipient: '', budget: '', interest: 'any' }

const REQUIRED = [
  { name: 'occasion', message: 'Please pick an occasion.' },
  { name: 'recipient', message: 'Please pick who the gift is for.' },
  { name: 'budget', message: 'Please pick a budget.' },
]

// "Baby or new parent" only makes sense for a baby shower.
function recipientOptionsFor(occasion) {
  return occasion === 'baby-shower'
    ? RECIPIENTS
    : RECIPIENTS.filter((recipient) => recipient.id !== 'new-parent')
}

function GiftQuizForm({ initialAnswers, onSubmit, focusOnMount = false }) {
  const [answers, setAnswers] = useState({ ...EMPTY_ANSWERS, ...initialAnswers })
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  // When coming back from the results, put keyboard focus on the first question.
  useEffect(() => {
    if (!focusOnMount) return
    const occasionInputs = formRef.current.querySelectorAll('input[name="occasion"]')
    const checked = [...occasionInputs].find((input) => input.checked)
    ;(checked ?? occasionInputs[0])?.focus()
  }, [focusOnMount])

  function update(name, value) {
    setAnswers((previous) => {
      const next = { ...previous, [name]: value }
      // Clear an answer that is no longer offered for the new occasion.
      if (name === 'occasion' && next.recipient === 'new-parent' && value !== 'baby-shower') {
        next.recipient = ''
      }
      return next
    })
    setErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const missing = REQUIRED.filter(({ name }) => !answers[name])

    if (missing.length > 0) {
      setErrors(Object.fromEntries(missing.map(({ name, message }) => [name, message])))
      // Move keyboard focus to the first unanswered question.
      formRef.current.querySelector(`input[name="${missing[0].name}"]`)?.focus()
      return
    }
    onSubmit(answers)
  }

  return (
    <form ref={formRef} className="gift-quiz-form" onSubmit={handleSubmit} noValidate>
      <ChoiceGroup
        name="occasion"
        legend="What's the occasion?"
        options={OCCASIONS}
        value={answers.occasion}
        onChange={(value) => update('occasion', value)}
        error={errors.occasion}
      />
      <ChoiceGroup
        name="recipient"
        legend="Who is it for?"
        options={recipientOptionsFor(answers.occasion)}
        value={answers.recipient}
        onChange={(value) => update('recipient', value)}
        error={errors.recipient}
      />
      <ChoiceGroup
        name="budget"
        legend="What's your budget?"
        options={BUDGETS}
        value={answers.budget}
        onChange={(value) => update('budget', value)}
        error={errors.budget}
      />
      <ChoiceGroup
        name="interest"
        legend="What are they into? (optional)"
        options={INTERESTS}
        value={answers.interest}
        onChange={(value) => update('interest', value)}
      />
      <button type="submit" className="gift-quiz-form__submit">
        Find gift ideas
      </button>
    </form>
  )
}

export default GiftQuizForm
