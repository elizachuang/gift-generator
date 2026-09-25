import EmptyState from './EmptyState.jsx'
import GiftCard from './GiftCard.jsx'

// tagsFor (optional): gift => list of short labels explaining why the gift matched.
function GiftList({ gifts, onChangeAnswers, tagsFor = () => [] }) {
  if (gifts.length === 0) return <EmptyState onChangeAnswers={onChangeAnswers} />

  return (
    <ul className="gift-list">
      {gifts.map((gift, index) => (
        <li key={gift.id} className={index === 0 ? 'gift-list__top' : undefined}>
          <GiftCard gift={gift} isTopPick={index === 0} tags={tagsFor(gift)} />
        </li>
      ))}
    </ul>
  )
}

export default GiftList
