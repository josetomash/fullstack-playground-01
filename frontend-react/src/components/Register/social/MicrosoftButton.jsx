import './SocialButtons.css'

export function MicrosoftButton({ onClick }) {
  return (
    <button
      type="button"
      className="social-btn social-btn--microsoft"
      onClick={onClick}
    >
      <svg
        className="social-btn__icon"
        viewBox="0 0 23 23"
        width="20"
        height="20"
        aria-hidden="true"
      >
        <path fill="#f35325" d="M1 1h10v10H1z"/>
        <path fill="#81bc06" d="M12 1h10v10H12z"/>
        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
        <path fill="#ffba08" d="M12 12h10v10H12z"/>
      </svg>
      <span className="social-btn__label">Continuar con Microsoft</span>
    </button>
  )
}