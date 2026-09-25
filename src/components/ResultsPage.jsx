import { useEffect, useRef } from 'react'
import { BUDGETS, OCCASIONS, RECIPIENTS } from '../data/options.js'
import GiftList from './GiftList.jsx'
import './ResultsPage.css'

const labelOf = (options, id) => options.find((option) => option.id === id)?.label

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
      <h2 id="results-heading" ref={headingRef} tabIndex={-1}>
        {gifts.length === 1 ? '1 gift idea for you' : `${gifts.length} gift ideas for you`}
      </h2>
      <p className="results-page__summary">{summary}</p>
      <GiftList gifts={gifts} onChangeAnswers={onChangeAnswers} />
      {gifts.length > 0 && (
        <button type="button" className="secondary-button" onClick={onChangeAnswers}>
          Change answers
        </button>
      )}
    </section>
  )
}

export default ResultsPage
