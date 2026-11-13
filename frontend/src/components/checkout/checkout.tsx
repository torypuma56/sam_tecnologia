import { useState } from 'react'
import { useCarrito } from '../../hooks/useCarrito'
import PagoQr from '../pagoQr/pagoQr'
import styles from './checkout.module.css'
import { API } from '../../config/api'

type CheckoutProps = {
  onCerrar: () => void
}

function Checkout({ onCerrar }: CheckoutProps) {
  const { items, total, vaciarCarrito } = useCarrito()
  const [paso, setPaso] = useState<'datos' | 'pago' | 'qr' | 'exito'>('datos')
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'qr'>('efectivo')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: ''
  })

  const handlePagar = async (comprobante = '') => {
    setEnviando(true)
    setError('')

    try {
      const res = await fetch(`${API}/pedidos/publico`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          metodo_pago: metodoPago,
          comprobante: comprobante || null,
          total,
          items: items.map(item => ({
            producto_id: item.id,
            cantidad: item.cantidad,
            precio_unitario: item.precio,
            subtotal: item.precio * item.cantidad
          }))
        })
      })

      const data = await res.json()

      if (data.success) {
        vaciarCarrito()
        setPaso('exito')
      } else {
        setError('Error al procesar el pedido')
      }
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setEnviando(false)
    }
  }

  if (paso === 'exito') {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.exito}>
            <div className={styles.exitoIcono}>🎉</div>
            <h2>Pedido confirmado!</h2>
            <p>Nos pondremos en contacto contigo pronto para coordinar la entrega.</p>
            <button onClick={onCerrar} className={styles.btnVolver}>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (paso === 'qr') {
    return (
      <PagoQr
        total={total}
        onConfirmar={(comprobante) => handlePagar(comprobante)}
        onCancelar={() => setPaso('pago')}
      />
    )
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Finalizar pedido</h2>
          <button onClick={onCerrar} className={styles.btnCerrar}>✕</button>
        </div>

        <div className={styles.body}>
          {paso === 'datos' && (
            <div className={styles.form}>
              <h3>Tus datos</h3>
              <div className={styles.campo}>
                <label>Nombre completo</label>
                <input
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Tu nombre"
                />
              </div>
              <div className={styles.campo}>
                <label>Teléfono / WhatsApp</label>
                <input
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })}
                  placeholder="+591 7XXXXXXX"
                />
              </div>
              <div className={styles.campo}>
                <label>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </div>
              <div className={styles.campo}>
                <label>Dirección de entrega</label>
                <input
                  value={form.direccion}
                  onChange={e => setForm({ ...form, direccion: e.target.value })}
                  placeholder="Tu dirección en Sucre"
                />
              </div>
            </div>
          )}

          {paso === 'pago' && (
            <div className={styles.metodoPago}>
              <h3>Método de pago</h3>
              <div className={styles.metodos}>
                <div
                  className={`${styles.metodo} ${metodoPago === 'efectivo' ? styles.metodoActivo : ''}`}
                  onClick={() => setMetodoPago('efectivo')}
                >
                  <span className={styles.metodoIcono}>💵</span>
                  <span className={styles.metodoNombre}>Efectivo</span>
                  <span className={styles.metodoDesc}>Paga al momento de la entrega</span>
                </div>
                <div
                  className={`${styles.metodo} ${metodoPago === 'qr' ? styles.metodoActivo : ''}`}
                  onClick={() => setMetodoPago('qr')}
                >
                  <span className={styles.metodoIcono}>📱</span>
                  <span className={styles.metodoNombre}>QR</span>
                  <span className={styles.metodoDesc}>Paga con transferencia QR</span>
                </div>
              </div>
              <div className={styles.resumen}>
                <span>Total:</span>
                <span className={styles.totalMonto}>Bs. {total.toFixed(2)}</span>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          {paso === 'datos' && (
            <>
              <button onClick={onCerrar} className={styles.btnCancelar}>Cancelar</button>
              <button
                onClick={() => setPaso('pago')}
                className={styles.btnSiguiente}
                disabled={!form.nombre || !form.telefono || !form.email || !form.direccion}
              >
                Siguiente →
              </button>
            </>
          )}
          {paso === 'pago' && (
            <>
              <button onClick={() => setPaso('datos')} className={styles.btnCancelar}>
                ← Volver
              </button>
              <button
                onClick={() => metodoPago === 'qr' ? setPaso('qr') : handlePagar()}
                className={styles.btnSiguiente}
                disabled={enviando}
              >
                {enviando ? 'Procesando...' : metodoPago === 'qr' ? 'Pagar con QR' : 'Confirmar pedido'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout