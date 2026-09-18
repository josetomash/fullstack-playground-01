// src/components/LoginCard/LoginCard.jsx
import { useState } from 'react'
import './LoginCard.css'

export function LoginCard({
  onNavigateRegister,
  onLoginSubmit,
  isLoading,
  error,
  successMessage,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLoginSubmit({ email, password })
  }

  return (
    <div className="login-card" style={{ margin: 'auto' }}>
      <div className="avatar-container">
        <svg className="avatar-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>

      <h2 className="login-title">Iniciar sesión</h2>

      <a
        href="#register"
        className="register-text-link"
        onClick={(e) => {
          e.preventDefault()
          onNavigateRegister()
        }}
      >
        click aquí para crear cuenta
      </a>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="usuario@gmail.com"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="contraseña"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        {successMessage && <p className="login-success">{successMessage}</p>}
        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? (
            <svg
              className="spinner-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
              />
            </svg>
          ) : (
            'Entrar'
          )}
        </button>
      </form>
    </div>
  )
}