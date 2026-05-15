import { useState } from 'react'
import { useCarrito } from '../../context/carritoContext'
import styles from './carrito.module.css'

function Carrito() {
  const { items, quitarItem, actualizarCantidad, vaciarCarrito, total, totalItems } = useCarrito()
  const [abierto, setAbierto] = useState(false)

  return (
    <>
      {/* Botón flotante */}
      <button className={styles.btnFlotante} onClick={() => setAbierto(true)}>
        🛒
        {totalItems > 0 && (
          <span className={styles.badge}>{totalItems}</span>
        )}
      </button>

      {/* Overlay */}
      {abierto && (
        <div className={styles.overlay} onClick={() => setAbierto(false)} />
      )}

      {/* Panel carrito */}
      <div className={`${styles.panel} ${abierto ? styles.panelAbierto : ''}`}>
        <div className={styles.panelHeader}>
          <h3>🛒 Carrito ({totalItems})</h3>
          <button onClick={() => setAbierto(false)} className={styles.btnCerrar}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.vacio}>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <img src={item.imagen} alt={item.nombre} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <h4>{item.nombre}</h4>
                    <span className={styles.itemPrecio}>Bs. {item.precio}</span>
                    <div className={styles.itemCantidad}>
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => quitarItem(item.id)} className={styles.btnQuitar}>✕</button>
                </div>
              ))}
            </div>

            <div className={styles.panelFooter}>
              <div className={styles.total}>
                <span>Total:</span>
                <span className={styles.totalMonto}>Bs. {total.toFixed(2)}</span>
              </div>
              <div className={styles.acciones}>
                <button className={styles.btnEfectivo}>
                  💵 Pagar en efectivo
                </button>
                <button className={styles.btnQr}>
                  📱 Pagar con QR
                </button>
                <button className={styles.btnCotizar}>
                  📝 Solicitar cotización
                </button>
                <button className={styles.btnVaciar} onClick={vaciarCarrito}>
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Carrito