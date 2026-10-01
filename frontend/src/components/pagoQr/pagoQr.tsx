import { useState, useEffect } from 'react'
import styles from './pagoQr.module.css'
import { API } from '../../config/api'

type PagoQrProps = {
  total: number
  onConfirmar: (comprobante: string) => void
  onCancelar: () => void
}

function PagoQr({ total, onConfirmar, onCancelar }: PagoQrProps) {
  const [qrImagen, setQrImagen] = useState('')
  const [comprobante, setComprobante] = useState('')
  const [subiendo, setSubiendo] = useState(false)

  useEffect(() => {
    fetch(`${API}/configuracion/publica`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.qr_imagen) {
          setQrImagen(data.data.qr_imagen)
        }
      })
      .catch(() => {})
  }, [])

  const subirComprobante = async (archivo: File) => {
    setSubiendo(true)
    const formData = new FormData()
    formData.append('archivo', archivo)

    const res = await fetch(`${API}/upload/imagen`, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    setSubiendo(false)
    if (data.success) setComprobante(data.data.url)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Pago con QR</h2>
          <button onClick={onCancelar} className={styles.btnCerrar}>✕</button>
        </div>

        <div className={styles.body}>
          <p className={styles.total}>Total a pagar: <strong>Bs. {total.toFixed(2)}</strong></p>

          {qrImagen ? (
            <div className={styles.qrContainer}>
              <p>Escanea el código QR para pagar:</p>
              <img src={qrImagen} alt="QR de pago" className={styles.qrImg} />
            </div>
          ) : (
            <p className={styles.sinQr}>QR de pago no disponible</p>
          )}

          <div className={styles.campo}>
            <label>Sube tu comprobante de pago</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                if (e.target.files?.[0]) subirComprobante(e.target.files[0])
              }}
            />
            {subiendo && <p className={styles.subiendo}>Subiendo comprobante...</p>}
            {comprobante && (
              <img src={comprobante} alt="Comprobante" className={styles.preview} />
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onCancelar} className={styles.btnCancelar}>
            Cancelar
          </button>
          <button
            onClick={() => onConfirmar(comprobante)}
            className={styles.btnConfirmar}
            disabled={!comprobante}
          >
            Confirmar pago
          </button>
        </div>
      </div>
    </div>
  )
}

export default PagoQr