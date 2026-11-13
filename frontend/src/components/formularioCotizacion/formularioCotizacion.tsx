import { useState } from 'react'
import { useCarrito } from '../../hooks/useCarrito'
import styles from './formularioCotizacion.module.css'
import { API } from '../../config/api'

function FormularioCotizacion() {
  const { items, vaciarCarrito } = useCarrito()
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError('')

    try {
      const res = await fetch(`${API}/cotizaciones/publica`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map(item => ({
            producto_id: item.id,
            cantidad: item.cantidad
          }))
        })
      })

      const data = await res.json()

      if (data.success) {
        setEnviado(true)
        vaciarCarrito()
        setForm({ nombre: '', telefono: '', email: '', mensaje: '' })
      } else {
        setError('Error al enviar la cotización')
      }
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <section className={styles.seccion} id="formulario">
        <div className={styles.exito}>
          <div className={styles.exitoIcono}>✅</div>
          <h2>Cotización enviada!</h2>
          <p>Nos pondremos en contacto contigo pronto por WhatsApp.</p>
          <button onClick={() => setEnviado(false)} className={styles.btnNueva}>
            Enviar otra cotización
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.seccion} id="formulario">
      <div className={styles.contenedor}>
        <div className={styles.header}>
          <h2>Solicita tu <span className={styles.accent}>Cotización</span></h2>
          <p>Completa el formulario y te contactamos por WhatsApp</p>
        </div>

        {items.length > 0 && (
          <div className={styles.productosSeleccionados}>
            <h3>Productos seleccionados:</h3>
            {items.map(item => (
              <div key={item.id} className={styles.itemSeleccionado}>
                <span>{item.nombre}</span>
                <span>x{item.cantidad}</span>
                <span>Bs. {item.precio * item.cantidad}</span>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleEnviar} className={styles.form}>
          <div className={styles.fila}>
            <div className={styles.campo}>
              <label>Nombre completo</label>
              <input
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className={styles.campo}>
              <label>Teléfono / WhatsApp</label>
              <input
                value={form.telefono}
                onChange={e => setForm({ ...form, telefono: e.target.value })}
                placeholder="+591 7XXXXXXX"
                required
              />
            </div>
          </div>
          <div className={styles.campo}>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div className={styles.campo}>
            <label>Mensaje</label>
            <textarea
              value={form.mensaje}
              onChange={e => setForm({ ...form, mensaje: e.target.value })}
              placeholder="Describe lo que necesitas..."
              rows={4}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btnEnviar} disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar Cotización'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default FormularioCotizacion