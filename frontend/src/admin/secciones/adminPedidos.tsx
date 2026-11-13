import { useState, useEffect, useCallback, useMemo } from 'react'
import styles from './adminPedidos.module.css'
import { API } from '../../config/api'

type PedidoItem = {
  producto_nombre: string
  cantidad: number
  precio_unitario: number
  subtotal: number
}

type Pedido = {
  id: number
  cliente_nombre: string
  cliente_telefono: string
  cliente_email: string
  direccion: string
  metodo_pago: string
  comprobante: string | null
  total: number
  estado: string
  created_at: string
  items?: PedidoItem[]
}

function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [pedidoDetalle, setPedidoDetalle] = useState<Pedido | null>(null)

  const token = localStorage.getItem('token')
  const headers = useMemo(
    () => ({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }),
    [token]
  )

  const cargarPedidos = useCallback(() => {
    fetch(`${API}/pedidos`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.success) setPedidos(data.data)
      })
      .catch(() => {})
  }, [headers])

  useEffect(() => {
    cargarPedidos()
  }, [cargarPedidos])

  const verDetalle = async (id: number) => {
    const res = await fetch(`${API}/pedidos/${id}`, { headers })
    const data = await res.json()
    if (data.success) setPedidoDetalle(data.data)
  }

  const cambiarEstado = async (id: number, estado: string) => {
    await fetch(`${API}/pedidos/${id}/estado`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ estado })
    })
    cargarPedidos()
    if (pedidoDetalle?.id === id) {
      setPedidoDetalle(prev => prev ? { ...prev, estado } : null)
    }
  }

  const estadoColor = (estado: string) => {
    if (estado === 'pendiente') return styles.pendiente
    if (estado === 'confirmado') return styles.confirmado
    if (estado === 'enviado') return styles.enviado
    if (estado === 'entregado') return styles.entregado
    return styles.cancelado
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>🛒 Pedidos</h1>
      </div>

      <div className={styles.contenedor}>
        <div className={styles.lista}>
          {pedidos.length === 0 ? (
            <p className={styles.vacio}>No hay pedidos aún</p>
          ) : (
            pedidos.map(pedido => (
              <div
                key={pedido.id}
                className={`${styles.item} ${pedidoDetalle?.id === pedido.id ? styles.itemActivo : ''}`}
                onClick={() => verDetalle(pedido.id)}
              >
                <div className={styles.itemHeader}>
                  <span className={styles.itemNombre}>{pedido.cliente_nombre}</span>
                  <span className={`${styles.estado} ${estadoColor(pedido.estado)}`}>
                    {pedido.estado}
                  </span>
                </div>
                <p className={styles.itemTotal}>Bs. {pedido.total}</p>
                <div className={styles.itemMeta}>
                  <span>{pedido.metodo_pago === 'efectivo' ? '💵 Efectivo' : '📱 QR'}</span>
                  <span>{new Date(pedido.created_at).toLocaleDateString('es-BO')}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {pedidoDetalle ? (
          <div className={styles.detalle}>
            <div className={styles.detalleHeader}>
              <h2>Pedido #{pedidoDetalle.id}</h2>
              <span className={`${styles.estado} ${estadoColor(pedidoDetalle.estado)}`}>
                {pedidoDetalle.estado}
              </span>
            </div>

            <div className={styles.detalleInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Cliente</span>
                <span>{pedidoDetalle.cliente_nombre}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Teléfono</span>
                <span>{pedidoDetalle.cliente_telefono}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span>{pedidoDetalle.cliente_email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Dirección</span>
                <span>{pedidoDetalle.direccion}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Método de pago</span>
                <span>{pedidoDetalle.metodo_pago === 'efectivo' ? '💵 Efectivo' : '📱 QR'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Total</span>
                <span className={styles.total}>Bs. {pedidoDetalle.total}</span>
              </div>
            </div>

            {pedidoDetalle.comprobante && (
              <div className={styles.comprobante}>
                <h3>Comprobante de pago</h3>
                <img src={pedidoDetalle.comprobante} alt="Comprobante" />
              </div>
            )}

            {pedidoDetalle.items && pedidoDetalle.items.length > 0 && (
              <div className={styles.items}>
                <h3>Productos</h3>
                {pedidoDetalle.items.map((item, i) => (
                  <div key={i} className={styles.itemProducto}>
                    <span>{item.producto_nombre}</span>
                    <span>x{item.cantidad}</span>
                    <span>Bs. {item.subtotal}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.acciones}>
              <h3>Cambiar estado</h3>
              <div className={styles.botonesEstado}>
                <button onClick={() => cambiarEstado(pedidoDetalle.id, 'pendiente')} className={`${styles.btnEstado} ${styles.btnPendiente}`}>Pendiente</button>
                <button onClick={() => cambiarEstado(pedidoDetalle.id, 'confirmado')} className={`${styles.btnEstado} ${styles.btnConfirmado}`}>Confirmado</button>
                <button onClick={() => cambiarEstado(pedidoDetalle.id, 'enviado')} className={`${styles.btnEstado} ${styles.btnEnviado}`}>Enviado</button>
                <button onClick={() => cambiarEstado(pedidoDetalle.id, 'entregado')} className={`${styles.btnEstado} ${styles.btnEntregado}`}>Entregado</button>
                <button onClick={() => cambiarEstado(pedidoDetalle.id, 'cancelado')} className={`${styles.btnEstado} ${styles.btnCancelado}`}>Cancelado</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.sinSeleccion}>
            <p>Selecciona un pedido para ver el detalle</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPedidos