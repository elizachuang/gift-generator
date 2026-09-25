import { buyLink } from '../logic/buyLink.js'
import { formatPrice } from '../logic/formatPrice.js'
import './GiftCard.css'

function GiftCard({ gift, isTopPick = false, tags = [] }) {
  return (
    <article className={isTopPick ? 'gift-card gift-card--top' : 'gift-card'}>
      {isTopPick && <p className="gift-card__badge">★ Best match</p>}
      <h2 className="gift-card__name">{gift.name}</h2>
      <p className="gift-card__price">{formatPrice(gift.price)}</p>
      {tags.length > 0 && (
        <ul className="gift-card__tags" aria-label="Matches">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <p>{gift.description}</p>
      <p className="gift-card__why">
        <strong>Why it feels special: </strong>
        {gift.whySpecial}
      </p>
      <a className="gift-card__link" href={buyLink(gift)} target="_blank" rel="noopener noreferrer">
        Find in shops
        <span className="visually-hidden">: {gift.name} (opens Google Shopping in a new tab)</span>
      </a>
    </article>
  )
}

export default GiftCard
