import styles from './hero.module.css'

function Hero() {
  return (
    <section className={styles.hero} id="inicio">

      {/* Video de fondo */}
      <video
        className={styles.videoBg}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/gifhero.mp4" type="video/mp4" />
      </video>

      {/* Capa oscura */}
      <div className={styles.overlay}></div>

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
            Solicitar Cotización
          </a>
          <a href="#servicios" className={styles.btnSecundario}>
            Ver Servicios
          </a>
        </div>
      </div>

      <div className={styles.imagen}>
        <div className={styles.imagenCard}>
          <img src="/images/hero.png" alt="Hero" />
        </div>
      </div>

    </section>
  )
}

export default Hero