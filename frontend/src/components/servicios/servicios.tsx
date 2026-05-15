import { useState, useEffect } from 'react'
import styles from './servicios.module.css'

type Servicio = {
  id: number
  nombre: string
  descripcion: string
  icono: string
  precio_referencial: number | null
  estado: string
}

function Servicios() {
  const [servicios, setServicios] = useState<Servicio[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/servicios/publicos')
      .then(res => res.json())
      .then(data => {
        if (data.success) setServicios(data.data)
      })
      .catch(() => setServicios([]))
  }, [])

  return (
    <section className={styles.servicios} id="servicios">
      <div className={styles.header}>
        <h2>Nuestros <span className={styles.accent}>Servicios</span></h2>
        <p>Soluciones completas para tu seguridad</p>
      </div>
      <div className={styles.grid}>
        {servicios.length === 0 ? (
          <p className={styles.vacio}>No hay servicios disponibles aún.</p>
        ) : (
          servicios.map(servicio => (
            <div key={servicio.id} className={styles.card}>
              <div className={styles.icono}>{servicio.icono}</div>
              <h3>{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>
              {servicio.precio_referencial && (
                <span className={styles.precio}>
                  Desde Bs. {servicio.precio_referencial}
                </span>
              )}
              <span className={styles.link}>Más información →</span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Servicios