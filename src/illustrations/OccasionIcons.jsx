// Small decorative icons for the occasion options. Hidden from screen readers,
// because the option's text label already says what it is.

function Icon({ children }) {
  return (
    <svg className="option-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

export function Balloon() {
  return (
    <Icon>
      <ellipse cx="16" cy="12" rx="8" ry="10" fill="var(--color-primary)" />
      <path d="M14 22 l2 3 l2 -3 z" fill="var(--color-primary)" />
      <path d="M16 25 q-3 3 0 6" stroke="var(--color-text)" strokeWidth="1.5" fill="none" />
      <ellipse cx="13" cy="8" rx="2" ry="3" fill="#ffffff" opacity="0.6" />
    </Icon>
  )
}

export function Rattle() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="8" fill="var(--color-accent)" />
      <circle cx="12" cy="12" r="3" fill="var(--color-primary)" />
      <rect
        x="17"
        y="17"
        width="4"
        height="12"
        rx="2"
        fill="var(--color-teal)"
        transform="rotate(-45 19 23)"
      />
    </Icon>
  )
}

export function Suitcase() {
  return (
    <Icon>
      <rect
        x="12"
        y="5"
        width="8"
        height="5"
        rx="2"
        fill="none"
        stroke="var(--color-text)"
        strokeWidth="2"
      />
      <rect x="4" y="9" width="24" height="18" rx="3" fill="var(--color-teal)" />
      <rect x="4" y="15" width="24" height="3" fill="var(--color-accent)" />
    </Icon>
  )
}

export function House() {
  return (
    <Icon>
      <path d="M4 15 L16 4 L28 15 Z" fill="var(--color-primary)" />
      <rect x="7" y="14" width="18" height="14" fill="var(--color-accent)" />
      <rect x="14" y="19" width="5" height="9" fill="var(--color-teal)" />
    </Icon>
  )
}

export function Tree() {
  return (
    <Icon>
      <path d="M16 3 L25 15 H20 L27 24 H5 L12 15 H7 Z" fill="var(--color-teal)" />
      <rect x="14" y="24" width="4" height="5" fill="var(--color-primary-hover)" />
      <circle cx="16" cy="3" r="2" fill="var(--color-accent)" />
      <circle cx="12" cy="18" r="1.5" fill="var(--color-primary)" />
      <circle cx="20" cy="12" r="1.5" fill="var(--color-accent)" />
    </Icon>
  )
}
