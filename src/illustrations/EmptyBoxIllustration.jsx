// Empty-state illustration: an open, empty box. Decorative only.
function EmptyBoxIllustration({ className }) {
  return (
    <svg className={className} viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <path d="M30 50 L80 34 L130 50 L80 66 Z" fill="var(--color-primary-soft)" />
      <path d="M30 50 L80 66 L80 112 L30 96 Z" fill="var(--color-primary)" />
      <path d="M130 50 L80 66 L80 112 L130 96 Z" fill="var(--color-primary-hover)" />
      <path d="M30 50 L10 34 L60 18 L80 34 Z" fill="var(--color-primary)" opacity="0.8" />
      <path d="M130 50 L150 34 L100 18 L80 34 Z" fill="var(--color-primary)" opacity="0.8" />
      <circle cx="80" cy="10" r="4" fill="var(--color-accent)" />
      <circle cx="120" cy="14" r="3" fill="var(--color-teal)" />
      <circle cx="40" cy="12" r="3" fill="var(--color-teal)" />
    </svg>
  )
}

export default EmptyBoxIllustration
