import EmptyBoxIllustration from '../illustrations/EmptyBoxIllustration.jsx'

function EmptyState({ onChangeAnswers }) {
  return (
    <div className="empty-state">
      <EmptyBoxIllustration className="empty-state__illustration" />
      <p>
        <strong>No exact match yet.</strong> Try a different budget or recipient.
      </p>
      <button type="button" className="secondary-button" onClick={onChangeAnswers}>
        Change answers
      </button>
    </div>
  )
}

export default EmptyState
