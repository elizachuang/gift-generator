// Hero illustration: a wrapped gift with confetti. Decorative only (hidden from screen readers).
function GiftBoxIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 240 200" aria-hidden="true" focusable="false">
      {/* confetti */}
      <circle cx="30" cy="40" r="6" fill="var(--color-accent)" />
      <circle cx="210" cy="30" r="5" fill="var(--color-teal)" />
      <circle cx="200" cy="120" r="7" fill="var(--color-accent)" />
      <circle cx="44" cy="130" r="4" fill="var(--color-primary)" />
      <rect
        x="180"
        y="62"
        width="10"
        height="10"
        rx="2"
        fill="var(--color-primary)"
        transform="rotate(20 185 67)"
      />
      <rect
        x="52"
        y="76"
        width="9"
        height="9"
        rx="2"
        fill="var(--color-teal)"
        transform="rotate(-15 56 80)"
      />
      <path d="M22 88 l6 -10 l6 10 z" fill="var(--color-teal)" />
      <path d="M214 80 l5 -9 l5 9 z" fill="var(--color-primary)" />
      {/* bow */}
      <path
        d="M120 70 C 96 40, 70 52, 84 72 C 92 82, 110 76, 120 70 Z"
        fill="var(--color-accent)"
      />
      <path
        d="M120 70 C 144 40, 170 52, 156 72 C 148 82, 130 76, 120 70 Z"
        fill="var(--color-accent)"
      />
      {/* box */}
      <rect x="62" y="96" width="116" height="88" rx="10" fill="var(--color-primary)" />
      <rect x="54" y="72" width="132" height="30" rx="8" fill="var(--color-primary-hover)" />
      {/* ribbon */}
      <rect x="110" y="72" width="20" height="112" fill="var(--color-accent)" />
      <circle cx="120" cy="70" r="9" fill="var(--color-accent-dark)" />
    </svg>
  )
}

export default GiftBoxIllustration
