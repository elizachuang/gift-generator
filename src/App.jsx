import { useState } from 'react'
import GiftQuizForm from './components/GiftQuizForm.jsx'
import Header from './components/Header.jsx'
import ResultsPage from './components/ResultsPage.jsx'
import gifts from './data/gifts.json'
import { findGifts } from './logic/findGifts.js'

function App() {
  // The last submitted answers; kept when going back so the form stays filled in.
  const [answers, setAnswers] = useState(null)
  const [showResults, setShowResults] = useState(false)

  function handleSubmit(newAnswers) {
    setAnswers(newAnswers)
    setShowResults(true)
  }

  return (
    <main className="app">
      <Header />
      {showResults ? (
        <ResultsPage
          answers={answers}
          gifts={findGifts(answers, gifts)}
          onChangeAnswers={() => setShowResults(false)}
        />
      ) : (
        <GiftQuizForm
          initialAnswers={answers}
          focusOnMount={answers !== null}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  )
}

export default App
