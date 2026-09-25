// Shows a validation message. Renders nothing when there is no message.
function ErrorMessage({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="error-message">
      {message}
    </p>
  )
}

export default ErrorMessage
