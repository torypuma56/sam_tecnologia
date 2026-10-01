import styles from './cotizacion.module.css'

function Cotizacion() {
  return (
    <section className={styles.cotizacion} id="cotizacion">
      <div className={styles.contenedor}>
        <div className={styles.header}>
          <h2>Solicita tu <span className={styles.accent}>Cotización</span></h2>
          <p>Obtén un presupuesto personalizado en minutos</p>
        </div>
        <div className={styles.pasos}>
          <div className={styles.paso}>
            <div className={styles.pasoIcono}>
                      <img src="/icon/carrito.gif" alt="Carrito" className={styles.iconoCarrito} />

            </div>
            <span className={styles.pasoTitulo}>Selecciona Productos</span>
            <span className={styles.pasoDesc}>Elige los equipos que necesitas</span>
          </div>
          <span className={styles.flecha}>→</span>
          <div className={styles.paso}>
            <div className={styles.pasoIcono}>
                      <img src="/icon/ajuste.gif" alt="Ajuste" className={styles.iconoCarrito} />

            </div>
            <span className={styles.pasoTitulo}>Elige el Servicio</span>
            <span className={styles.pasoDesc}>Selecciona el tipo de instalación</span>
          </div>
          <span className={styles.flecha}>→</span>
          <div className={styles.paso}>
            <div className={styles.pasoIcono}>
                      <img src="/icon/correo.gif" alt="Correo" className={styles.iconoCarrito} />
            </div>
            <span className={styles.pasoTitulo}>Envíanos tus Datos</span>
            <span className={styles.pasoDesc}>Recibe tu cotización por WhatsApp</span>
          </div>
        </div>
        <a href="#formulario" className={styles.btnComentar}>
          Comenzar Cotización
        </a>
      </div>
    </section>
  )
}

export default Cotizacion