import { useState } from 'react'
import Header from './components/Header.jsx'
import GiftQuizForm from './components/GiftQuizForm.jsx'
import gifts from './data/gifts.json'
import { findGifts } from './logic/findGifts.js'

function App() {
  const [results, setResults] = useState(null)

  return (
    <main className="app">
      <Header />
      <GiftQuizForm onSubmit={(answers) => setResults(findGifts(answers, gifts))} />
      {/* Temporary summary; the gift cards replace this in M4. */}
      <p role="status" className="results-summary">
        {results && `We found ${results.length} gift ideas.`}
      </p>
    </main>
  )
}

export default App
