import { useState } from 'react'
import { useCarrito } from '../../hooks/useCarrito'
import Checkout from '../checkout/checkout'
import styles from './carrito.module.css'

type CarritoProps = {
  abierto: boolean
  onCerrar: () => void
}

function Carrito({ abierto, onCerrar }: CarritoProps) {
  const { items, quitarItem, actualizarCantidad, vaciarCarrito, total, totalItems } = useCarrito()
  const [checkoutAbierto, setCheckoutAbierto] = useState(false)

  return (
    <>
      {checkoutAbierto && (
        <Checkout onCerrar={() => setCheckoutAbierto(false)} />
      )}

      {abierto && (
        <div className={styles.overlay} onClick={onCerrar} />
      )}

      <div className={`${styles.panel} ${abierto ? styles.panelAbierto : ''}`}>
        <div className={styles.panelHeader}>
          <h3>Carrito ({totalItems})</h3>
          <button onClick={onCerrar} className={styles.btnCerrar}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.vacio}>
            <p>Tu carrito está vacío</p>
            <button
              className={styles.btnVerProductos}
              onClick={() => {
                onCerrar()
                setTimeout(() => {
                  document
                    .getElementById('productos')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }, 300)
              }}
            >
              + Agregar productos
            </button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} className={styles.itemImg} />
                  ) : (
                    <div className={styles.itemImgPlaceholder}>📷</div>
                  )}
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
                <button
                  className={styles.btnVerProductos}
                  onClick={() => {
                    onCerrar()
                    setTimeout(() => {
                      document
                        .getElementById('productos')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }, 300)
                  }}
                >
                  + Agregar productos
                </button>
                <button
                  className={styles.btnComprar}
                  onClick={() => {
                    onCerrar()
                    setCheckoutAbierto(true)
                  }}
                >
                  Proceder al pago
                </button>
                <button
                  className={styles.btnCotizar}
                  onClick={() => {
                    onCerrar()
                    window.location.href = '#formulario'
                  }}
                >
                  Solicitar cotización
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