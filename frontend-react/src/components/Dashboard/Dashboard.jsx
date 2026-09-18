// src/components/Dashboard/Dashboard.jsx
export function Dashboard({ onLogout }) {
  return (
    <div style={{ margin: 'auto', padding: '40px', textAlign: 'center' }}>
      <h1>¡Bienvenido a Vetcare! 🐾</h1>
      <p>Dashboard en construcción</p>
      <button
        type="button"
        onClick={onLogout}
        style={{ marginTop: '20px', padding: '10px 20px' }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}