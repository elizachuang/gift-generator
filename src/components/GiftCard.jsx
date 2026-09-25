import { buyLink } from '../logic/buyLink.js'
import { formatPrice } from '../logic/formatPrice.js'
import './GiftCard.css'

function GiftCard({ gift }) {
  return (
    <article className="gift-card">
      <h3 className="gift-card__name">{gift.name}</h3>
      <p className="gift-card__price">{formatPrice(gift.price)}</p>
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
