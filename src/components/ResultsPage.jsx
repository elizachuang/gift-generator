import { useEffect, useRef } from 'react'
import { BUDGETS, OCCASIONS, RECIPIENTS } from '../data/options.js'
import { matchTags } from '../logic/matchTags.js'
import GiftList from './GiftList.jsx'
import './ResultsPage.css'

const labelOf = (options, id) => options.find((option) => option.id === id)?.label

function ChangeAnswersButton({ onClick }) {
  return (
    <button type="button" className="secondary-button results-page__change" onClick={onClick}>
      Change answers
    </button>
  )
}

function ResultsPage({ answers, gifts, onChangeAnswers }) {
  const headingRef = useRef(null)

  // Move focus to the heading so keyboard and screen-reader users land on the results.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const summary = [
    labelOf(OCCASIONS, answers.occasion),
    labelOf(RECIPIENTS, answers.recipient),
    labelOf(BUDGETS, answers.budget),
  ].join(' · ')

  return (
    <section className="results-page" aria-labelledby="results-heading">
      <h1 id="results-heading" ref={headingRef} tabIndex={-1}>
        {gifts.length === 1 ? '1 gift idea for you' : `${gifts.length} gift ideas for you`}
      </h1>
      <p className="results-page__summary">{summary}</p>
      {/* Shown at the top and bottom so phone users don't have to scroll past every card. */}
      {gifts.length > 0 && <ChangeAnswersButton onClick={onChangeAnswers} />}
      <GiftList
        gifts={gifts}
        onChangeAnswers={onChangeAnswers}
        tagsFor={(gift) => matchTags(gift, answers)}
      />
      {gifts.length > 0 && <ChangeAnswersButton onClick={onChangeAnswers} />}
    </section>
  )
}

export default ResultsPage
