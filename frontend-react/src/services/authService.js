// src/services/authService.js
const API = import.meta.env.VITE_API_URL

export async function login({ email, password }) {
  // fetch llamada al backend para login
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error(`Error del servidor: ${res.status}`)
  }

  return res.json()
}

export async function register({ name, email, password }) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  if (!res.ok) {
    throw new Error(`Error del servidor: ${res.status}`)
  }

  return res.json()
}