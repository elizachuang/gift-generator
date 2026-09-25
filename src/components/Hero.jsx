import GiftBoxIllustration from '../illustrations/GiftBoxIllustration.jsx'
import './Hero.css'

// Welcome section above the quiz. The button moves focus to the first question.
function Hero({ onStart }) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__text">
        <h1 id="hero-heading">Find a gift they&rsquo;ll love</h1>
        <p className="hero__lead">
          Answer 3 quick questions and get thoughtful ideas that fit your budget, in under 2
          minutes.
        </p>
        <button type="button" className="primary-button" onClick={onStart}>
          Find a gift
        </button>
      </div>
      <GiftBoxIllustration className="hero__illustration" />
    </section>
  )
}

export default Hero
