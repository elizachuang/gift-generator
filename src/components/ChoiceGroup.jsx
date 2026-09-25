import ErrorMessage from './ErrorMessage.jsx'
import './ChoiceGroup.css'

// One quiz question: a labelled group of radio buttons, plus an optional error.
// Native radios keep it keyboard-friendly: Tab moves between questions, arrow keys between options.
function ChoiceGroup({ name, legend, options, value, onChange, error }) {
  const errorId = `${name}-error`

  return (
    <fieldset className="choice-group" aria-describedby={error ? errorId : undefined}>
      <legend>{legend}</legend>
      <div className="choice-group__options">
        {options.map((option) => (
          <label key={option.id} className="choice-group__option">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            {option.label}
          </label>
        ))}
      </div>
      <ErrorMessage id={errorId} message={error} />
    </fieldset>
  )
}

export default ChoiceGroup
