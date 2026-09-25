import { useRef, useState } from 'react'
import GiftQuizForm from './components/GiftQuizForm.jsx'
import Hero from './components/Hero.jsx'
import ResultsPage from './components/ResultsPage.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import gifts from './data/gifts.json'
import { findGifts } from './logic/findGifts.js'

function App() {
  // The last submitted answers; kept when going back so the form stays filled in.
  const [answers, setAnswers] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const quizRef = useRef(null)

  function handleSubmit(newAnswers) {
    setAnswers(newAnswers)
    setShowResults(true)
  }

  // "Find a gift" in the hero: jump to the first question.
  function startQuiz() {
    quizRef.current?.querySelector('input[name="occasion"]')?.focus()
  }

  return (
    <>
      <SiteHeader />
      <main className="app">
        {showResults ? (
          <ResultsPage
            answers={answers}
            gifts={findGifts(answers, gifts)}
            onChangeAnswers={() => setShowResults(false)}
          />
        ) : (
          <>
            <Hero onStart={startQuiz} />
            <div ref={quizRef}>
              <GiftQuizForm
                initialAnswers={answers}
                focusOnMount={answers !== null}
                onSubmit={handleSubmit}
              />
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default App
