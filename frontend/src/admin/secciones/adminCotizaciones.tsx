import { useState, useEffect, useCallback, useMemo } from 'react'
import styles from './adminCotizaciones.module.css'
import { API } from '../../config/api'

type CotizacionItem = {
  producto_nombre: string | null
  servicio_nombre: string | null
  cantidad: number
}

type Cotizacion = {
  id: number
  cliente_nombre: string
  cliente_telefono: string
  cliente_email: string
  mensaje: string
  estado: string
  created_at: string
  items?: CotizacionItem[]
}

function AdminCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([])
  const [cotizacionDetalle, setCotizacionDetalle] = useState<Cotizacion | null>(null)

  const token = localStorage.getItem('token')
  const headers = useMemo(
    () => ({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }),
    [token]
  )

  const cargarCotizaciones = useCallback(() => {
    fetch(`${API}/cotizaciones`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.success) setCotizaciones(data.data)
      })
      .catch(() => {})
  }, [headers])

  useEffect(() => {
    cargarCotizaciones()
  }, [cargarCotizaciones])

  const verDetalle = async (id: number) => {
    const res = await fetch(`${API}/cotizaciones/${id}`, { headers })
    const data = await res.json()
    if (data.success) setCotizacionDetalle(data.data)
  }

  const cambiarEstado = async (id: number, estado: string) => {
    await fetch(`${API}/cotizaciones/${id}/estado`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ estado })
    })
    cargarCotizaciones()
    if (cotizacionDetalle?.id === id) {
      setCotizacionDetalle(prev => prev ? { ...prev, estado } : null)
    }
  }

  const eliminarCotizacion = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta cotización?')) return
    await fetch(`${API}/cotizaciones/${id}`, {
      method: 'DELETE',
      headers
    })
    cargarCotizaciones()
    setCotizacionDetalle(null)
  }

  const estadoColor = (estado: string) => {
    if (estado === 'pendiente') return styles.pendiente
    if (estado === 'respondida') return styles.respondida
    return styles.cancelada
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>📝 Cotizaciones</h1>
      </div>

      <div className={styles.contenedor}>
        <div className={styles.lista}>
          {cotizaciones.length === 0 ? (
            <p className={styles.vacio}>No hay cotizaciones aún</p>
          ) : (
            cotizaciones.map(cotizacion => (
              <div
                key={cotizacion.id}
                className={`${styles.item} ${cotizacionDetalle?.id === cotizacion.id ? styles.itemActivo : ''}`}
                onClick={() => verDetalle(cotizacion.id)}
              >
                <div className={styles.itemHeader}>
                  <span className={styles.itemNombre}>{cotizacion.cliente_nombre}</span>
                  <span className={`${styles.estado} ${estadoColor(cotizacion.estado)}`}>
                    {cotizacion.estado}
                  </span>
                </div>
                <p className={styles.itemEmail}>{cotizacion.cliente_email}</p>
                <p className={styles.itemFecha}>
                  {new Date(cotizacion.created_at).toLocaleDateString('es-BO')}
                </p>
              </div>
            ))
          )}
        </div>

        {cotizacionDetalle ? (
          <div className={styles.detalle}>
            <div className={styles.detalleHeader}>
              <h2>Cotización #{cotizacionDetalle.id}</h2>
              <button
                onClick={() => eliminarCotizacion(cotizacionDetalle.id)}
                className={styles.btnEliminar}
              >
                🗑️ Eliminar
              </button>
            </div>
            <div className={styles.detalleInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nombre</span>
                <span>{cotizacionDetalle.cliente_nombre}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Teléfono</span>
                <span>{cotizacionDetalle.cliente_telefono}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span>{cotizacionDetalle.cliente_email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Mensaje</span>
                <span>{cotizacionDetalle.mensaje}</span>
              </div>
            </div>

            {cotizacionDetalle.items && cotizacionDetalle.items.length > 0 && (
              <div className={styles.items}>
                <h3>Productos/Servicios solicitados</h3>
                {cotizacionDetalle.items.map((item, i) => (
                  <div key={i} className={styles.itemProducto}>
                    <span>{item.producto_nombre || item.servicio_nombre}</span>
                    <span>x{item.cantidad}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.acciones}>
              <h3>Cambiar estado</h3>
              <div className={styles.botonesEstado}>
                <button
                  onClick={() => cambiarEstado(cotizacionDetalle.id, 'pendiente')}
                  className={`${styles.btnEstado} ${styles.btnPendiente}`}
                >
                  Pendiente
                </button>
                <button
                  onClick={() => cambiarEstado(cotizacionDetalle.id, 'respondida')}
                  className={`${styles.btnEstado} ${styles.btnRespondida}`}
                >
                  Respondida
                </button>
                <button
                  onClick={() => cambiarEstado(cotizacionDetalle.id, 'cancelada')}
                  className={`${styles.btnEstado} ${styles.btnCancelada}`}
                >
                  Cancelada
                </button>
              </div>
              
              <a
                href={"https://wa.me/" + cotizacionDetalle.cliente_telefono}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWhatsapp}
              >
              💬 Responder por WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.sinSeleccion}>
            <p>Selecciona una cotización para ver el detalle</p>
          </div>
        )}
      </div>
    </div>
    )
}

export default AdminCotizaciones