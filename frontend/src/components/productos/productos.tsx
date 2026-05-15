import { useState, useEffect } from 'react'
import { useCarrito } from '../../context/carritoContext'
import styles from './productos.module.css'

type Producto = {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  stock: number
  categoria: string
}

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const { agregarItem } = useCarrito()

  useEffect(() => {
    fetch('http://localhost:3000/productos/nuevos')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProductos(data.data)
      })
      .catch(() => setProductos([]))
  }, [])

  const handleAgregar = (producto: Producto) => {
    agregarItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
      stock: producto.stock
    })
  }

  return (
    <section className={styles.productos} id="productos">
      <div className={styles.header}>
        <h2>Productos <span className={styles.accent}>Destacados</span></h2>
        <p>Equipos de alta calidad para tu sistema de seguridad</p>
      </div>
      <div className={styles.grid}>
        {productos.length === 0 ? (
          <p className={styles.vacio}>No hay productos disponibles aún.</p>
        ) : (
          productos.map(producto => (
            <div key={producto.id} className={styles.card}>
              <div className={styles.imgContainer}>
                {producto.stock === 0 && (
                  <span className={styles.sinStock}>Sin stock</span>
                )}
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} className={styles.img} />
                ) : (
                  <div className={styles.sinImagen}>📷</div>
                )}
              </div>
              <div className={styles.info}>
                <span className={styles.categoria}>{producto.categoria}</span>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <div className={styles.footer}>
                  <span className={styles.precio}>Bs. {producto.precio}</span>
                  <button
                    className={styles.btnDetalle}
                    disabled={producto.stock === 0}
                    onClick={() => handleAgregar(producto)}
                  >
                    {producto.stock === 0 ? 'Sin stock' : 'Agregar'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Productos