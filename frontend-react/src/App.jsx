// src/App.jsx
import { useState } from 'react'
import { LoginCard } from './components/LoginCard/LoginCard'
import { Register } from './components/Register/Register'
import { Dashboard } from './components/Dashboard/Dashboard'
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [successMessage, setSuccessMessage] = useState(null)
  // desestructuracion y llamada a useAuth
  const { login, register, isLoading, error, clearError } = useAuth({
    onLoginSuccess: () => setCurrentView('dashboard'),
    onRegisterSuccess: () => {
      setSuccessMessage('¡Cuenta creada! Ahora inicia sesión.')
      setCurrentView('login')
    },
  })

  const handleLoginSubmit = ({ email, password }) => {
    setSuccessMessage(null)
    login({ email, password })
  }

  const handleRegisterSubmit = ({ name, email, password }) => {
    register({ name, email, password })
  }

  const goToRegister = () => {
    clearError()
    setSuccessMessage(null)
    setCurrentView('register')
  }

  const goToLogin = () => {
    clearError()
    setCurrentView('login')
  }

  return (
    <>
      {currentView === 'login' && (
        <LoginCard
          onNavigateRegister={goToRegister}
          onLoginSubmit={handleLoginSubmit}
          isLoading={isLoading}
          error={error}
          successMessage={successMessage}
        />
      )}

      {currentView === 'register' && (
        <Register
          onBackToLogin={goToLogin}
          onRegisterSubmit={handleRegisterSubmit}
          isLoading={isLoading}
          error={error}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard onLogout={goToLogin} />
      )}
    </>
  )
}

export default App