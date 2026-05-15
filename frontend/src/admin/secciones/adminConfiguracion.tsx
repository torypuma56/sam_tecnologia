import { useState, useEffect } from 'react'
import styles from './adminConfiguracion.module.css'

function AdminConfiguracion() {
  const [whatsapp, setWhatsapp] = useState('')
  const [qrImagen, setQrImagen] = useState('')
  const [emailAdmin, setEmailAdmin] = useState('')
  const [passwordActual, setPasswordActual] = useState('')
  const [passwordNuevo, setPasswordNuevo] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const token = localStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  useEffect(() => {
    cargarConfiguracion()
  }, [])

  const cargarConfiguracion = async () => {
    const res = await fetch('http://localhost:3000/configuracion', { headers })
    const data = await res.json()
    if (data.success && data.data) {
      setWhatsapp(data.data.whatsapp || '')
      setQrImagen(data.data.qr_imagen || '')
    }
  }

  const subirQr = async (archivo: File) => {
    setSubiendo(true)
    const formData = new FormData()
    formData.append('archivo', archivo)

    const res = await fetch('http://localhost:3000/upload/imagen', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    const data = await res.json()
    setSubiendo(false)
    if (data.success) setQrImagen(data.data.url)
  }

  const guardarConfiguracion = async () => {
    setGuardando(true)
    await fetch('http://localhost:3000/configuracion', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ whatsapp, qr_imagen: qrImagen })
    })
    setGuardando(false)
    setMensaje('Configuracion guardada correctamente')
    setTimeout(() => setMensaje(''), 3000)
  }

  const cambiarCredenciales = async () => {
    if (!passwordActual || !passwordNuevo) {
      setMensaje('Completa todos los campos')
      return
    }

    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email: emailAdmin, password: passwordActual })
    })
    const data = await res.json()

    if (!data.success) {
      setMensaje('Contrasena actual incorrecta')
      return
    }

    setMensaje('Credenciales actualizadas correctamente')
    setPasswordActual('')
    setPasswordNuevo('')
    setTimeout(() => setMensaje(''), 3000)
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Configuracion</h1>
      </div>

      {mensaje && <div className={styles.mensaje}>{mensaje}</div>}

      <div className={styles.grid}>
        <div className={styles.seccion}>
          <h2>Contacto y pagos</h2>
          <div className={styles.campo}>
            <label>Numero de WhatsApp</label>
            <input
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="+591712345678"
            />
          </div>
          <div className={styles.campo}>
            <label>Imagen QR de pago</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files?.[0]) subirQr(e.target.files[0])
              }}
            />
            {subiendo && <p className={styles.subiendo}>Subiendo QR...</p>}
            {qrImagen && (
              <img src={qrImagen} alt="QR de pago" className={styles.qrPreview} />
            )}
          </div>
          <button
            onClick={guardarConfiguracion}
            className={styles.btnGuardar}
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar configuracion'}
          </button>
        </div>

        <div className={styles.seccion}>
          <h2>Cambiar credenciales</h2>
          <div className={styles.campo}>
            <label>Email actual</label>
            <input
              type="email"
              value={emailAdmin}
              onChange={e => setEmailAdmin(e.target.value)}
              placeholder="admin@samtecnologia.bo"
            />
          </div>
          <div className={styles.campo}>
            <label>Contrasena actual</label>
            <input
              type="password"
              value={passwordActual}
              onChange={e => setPasswordActual(e.target.value)}
              placeholder="Contrasena actual"
            />
          </div>
          <div className={styles.campo}>
            <label>Nueva contrasena</label>
            <input
              type="password"
              value={passwordNuevo}
              onChange={e => setPasswordNuevo(e.target.value)}
              placeholder="Nueva contrasena"
            />
          </div>
          <button
            onClick={cambiarCredenciales}
            className={styles.btnGuardar}
          >
            Actualizar credenciales
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminConfiguracion