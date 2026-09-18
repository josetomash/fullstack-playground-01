// src/components/Register/Register.jsx
import { useState } from 'react'
import './Register.css'
import { GoogleButton }    from './social/GoogleButton'
import { AppleButton }     from './social/AppleButton'
import { FacebookButton }  from './social/FacebookButton'
import { MicrosoftButton } from './social/MicrosoftButton'
import { RegisterForm }    from './form/RegisterForm'

const SOCIAL_PROVIDERS = ['google', 'apple', 'facebook', 'microsoft']

export function Register({ onBackToLogin, onRegisterSubmit, isLoading, error }) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [localError, setLocalError] = useState(null)

  const handleSocialRegister = (provider) => {
    if (!SOCIAL_PROVIDERS.includes(provider)) return
    // implementar registro social más adelante
    console.log('Registro social pendiente:', provider)
  }

  const handleEmailRegister = (formData) => {
    const { name, email, password, passwordConfirm, terms } = formData

    // Validaciones de UI (antes de tocar la red)
    if (password !== passwordConfirm) {
      setLocalError('Las contraseñas no coinciden')
      return
    }
    if (!terms) {
      setLocalError('Debes aceptar los términos y condiciones')
      return
    }

    setLocalError(null)
    onRegisterSubmit({ name, email, password })
  }

  // El error mostrado combina errores locales (validación de form)
  // con el error del backend (email duplicado, etc.)
  const displayError = localError || error

  return (
    <div className="register-card" style={{ margin: 'auto' }}>
      <h2 className="register-title">Crear cuenta</h2>

      <div className="social-buttons">
        <GoogleButton    onClick={() => handleSocialRegister('google')} />
        <AppleButton     onClick={() => handleSocialRegister('apple')} />
        <FacebookButton  onClick={() => handleSocialRegister('facebook')} />
        <MicrosoftButton onClick={() => handleSocialRegister('microsoft')} />
      </div>

      {!showEmailForm && (
        <button
          type="button"
          className="register-email-toggle"
          onClick={() => setShowEmailForm(true)}
        >
          Crear cuenta con correo
        </button>
      )}

      {showEmailForm && (
        <>
          <div className="register-divider">
            <span>o regístrate con tu correo</span>
          </div>
          <RegisterForm
            onSubmit={handleEmailRegister}
            isLoading={isLoading}
            error={displayError}
          />
        </>
      )}

      <a
        href="#login"
        className="register-text-link"
        style={{ marginTop: '18px' }}
        onClick={(e) => {
          e.preventDefault()
          onBackToLogin()
        }}
      >
        ← Volver al inicio de sesión
      </a>
    </div>
  )
}