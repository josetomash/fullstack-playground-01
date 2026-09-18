// src/hooks/useAuth.js
import { useState } from 'react'
import {
  login as loginService,
  register as registerService,
} from '../services/authService'

export function useAuth({ onLoginSuccess, onRegisterSuccess } = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const clearError = () => setError(null)

  const login = async ({ email, password }) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await loginService({ email, password })
      // Aqui se guarda el valor que entrego authService.login()
      if (!data.ok) {
        setError(data.message || 'Credenciales incorrectas')
        return null
      }
      onLoginSuccess?.(data)
      return data
    } catch (err) {
      setError('No se pudo conectar con el servidor')
      console.error('Error de login:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const register = async ({ name, email, password }) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await registerService({ name, email, password })
      if (!data.ok) {
        setError(data.message || 'Error al registrar la cuenta')
        return null
      }
      onRegisterSuccess?.(data)
      return data
    } catch (err) {
      setError('No se pudo conectar con el servidor')
      console.error('Error de registro:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { login, register, isLoading, error, clearError }
}