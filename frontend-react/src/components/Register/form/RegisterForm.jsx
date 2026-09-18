// src/components/Register/form/RegisterForm.jsx
import './RegisterForm.css'

export function RegisterForm({ onSubmit, isLoading, error }) {
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    onSubmit?.({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
      terms: formData.get('terms') === 'on',
    })
  }

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate>
      <div className="register-form__field">
        <label htmlFor="reg-name">Nombre completo</label>
        <input
          id="reg-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ej: Ana Pérez"
          disabled={isLoading}
          required
        />
      </div>

      <div className="register-form__field">
        <label htmlFor="reg-email">Correo electrónico</label>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          disabled={isLoading}
          required
        />
      </div>

      <div className="register-form__field">
        <label htmlFor="reg-password">Contraseña</label>
        <input
          id="reg-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          disabled={isLoading}
          required
        />
      </div>

      <div className="register-form__field">
        <label htmlFor="reg-password2">Confirmar contraseña</label>
        <input
          id="reg-password2"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="Repite la contraseña"
          disabled={isLoading}
          required
        />
      </div>

      <label className="register-form__terms">
        <input type="checkbox" name="terms" disabled={isLoading} required />
        <span>
          Acepto los <a href="#terms">términos y condiciones</a>
        </span>
      </label>

      {error && <p className="register-form__error">{error}</p>}

      <button
        type="submit"
        className="register-form__submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="register-form__spinner"
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
          'Crear cuenta'
        )}
      </button>
    </form>
  )
}