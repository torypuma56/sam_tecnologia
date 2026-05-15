import styles from './footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenido}>
        <div className={styles.logo}>
          <span className={styles.logoTexto}>
            SAM-<span className={styles.accent}>TECNOLOGÍA</span>
          </span>
          <p>Sistemas de seguridad con tecnología avanzada</p>
        </div>
        <div className={styles.links}>
          <h4>Navegación</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#cotizacion">Cotización</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        <div className={styles.links}>
          <h4>Servicios</h4>
          <ul>
            <li><a href="#servicios">Instalación de Cámaras</a></li>
            <li><a href="#servicios">Mantenimiento</a></li>
            <li><a href="#servicios">Configuración DVR/NVR</a></li>
            <li><a href="#servicios">Cableado Estructurado</a></li>
          </ul>
        </div>
        <div className={styles.contacto}>
          <h4>Contacto</h4>
          <p>📞 +591 712 34567</p>
          <p>📧 info@samtecnologia.bo</p>
          <p>📍 Sucre, Bolivia</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2026 SAM-Tecnología. Todos los derechos reservados.</p>
        <div className={styles.bottomLinks}>
          <a href="/privacidad">Política de Privacidad</a>
          <a href="/terminos">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer