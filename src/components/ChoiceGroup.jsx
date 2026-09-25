import ErrorMessage from './ErrorMessage.jsx'
import './ChoiceGroup.css'

// One quiz question: a labelled group of radio buttons, plus an optional error.
// Native radios keep it keyboard-friendly: Tab moves between questions, arrow keys between options.
// icons (optional): { [option id]: IconComponent } shown before the option's label.
function ChoiceGroup({ name, legend, options, value, onChange, error, icons = {} }) {
  const errorId = `${name}-error`

  return (
    <fieldset className="choice-group" aria-describedby={error ? errorId : undefined}>
      <legend>{legend}</legend>
      <div className="choice-group__options">
        {options.map((option) => {
          const OptionIcon = icons[option.id]
          return (
            <label key={option.id} className="choice-group__option">
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={value === option.id}
                onChange={() => onChange(option.id)}
              />
              {OptionIcon && <OptionIcon />}
              {option.label}
            </label>
          )
        })}
      </div>
      <ErrorMessage id={errorId} message={error} />
    </fieldset>
  )
}

export default ChoiceGroup
