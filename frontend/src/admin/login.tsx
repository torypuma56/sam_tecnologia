import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError('')

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (data.success) {
        localStorage.setItem('token', data.token)
        navigate('/admin')
      } else {
        setError(data.message || 'Credenciales incorrectas')
      }
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoTexto}>
            SAM-<span className={styles.accent}>TECNOLOGÍA</span>
          </span>
          <p>Panel de Administración</p>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.campo}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@samtecnologia.bo"
              required
            />
          </div>
          <div className={styles.campo}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btnLogin} disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <a href="/" className={styles.volver}>← Volver al sitio</a>
      </div>
    </div>
  )
}

export default Login