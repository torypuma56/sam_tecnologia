import styles from './hero.module.css'

function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.contenido}>
        <div className={styles.badge}>
          <span className={styles.badgePunto}></span>
          Protege lo que más te importa
        </div>
        <h1 className={styles.titulo}>
          Sistemas de Seguridad con{' '}
          <span className={styles.tituloAccent}>Tecnología Avanzada</span>
        </h1>
        <p className={styles.descripcion}>
          Instalación profesional de cámaras de seguridad, venta de equipos
          y soluciones integrales para hogares y empresas en Sucre, Bolivia.
        </p>
        <div className={styles.botones}>
          <a href="#cotizacion" className={styles.btnPrimario}>
            🎯 Solicitar Cotización
          </a>
          <a href="#servicios" className={styles.btnSecundario}>
            Ver Servicios
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>500+</span>
            <span className={styles.statLabel}>Instalaciones</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>5★</span>
            <span className={styles.statLabel}>Calificación</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>24/7</span>
            <span className={styles.statLabel}>Soporte técnico</span>
          </div>
        </div>
      </div>
      <div className={styles.imagen}>
        <div className={styles.imagenCard}>
          📷
        </div>
      </div>
    </section>
  )
}

export default Hero