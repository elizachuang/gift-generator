import EmptyState from './EmptyState.jsx'
import GiftCard from './GiftCard.jsx'

function GiftList({ gifts, onChangeAnswers }) {
  if (gifts.length === 0) return <EmptyState onChangeAnswers={onChangeAnswers} />

  return (
    <ul className="gift-list">
      {gifts.map((gift) => (
        <li key={gift.id}>
          <GiftCard gift={gift} />
        </li>
      ))}
    </ul>
  )
}

export default GiftList
