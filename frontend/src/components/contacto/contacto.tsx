import styles from './contacto.module.css'

function Contacto() {
  return (
    <section className={styles.contacto} id="contacto">
      <div className={styles.contenido}>
        <h2>Contacto</h2>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.itemIcono}>📞</div>
            <div className={styles.itemTexto}>
              <span className={styles.itemLabel}>Teléfono / WhatsApp</span>
              <span className={styles.itemValor}>+591 712 34567</span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemIcono}>📧</div>
            <div className={styles.itemTexto}>
              <span className={styles.itemLabel}>Email</span>
              <span className={styles.itemValor}>info@samtecnologia.bo</span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemIcono}>📍</div>
            <div className={styles.itemTexto}>
              <span className={styles.itemLabel}>Ubicación</span>
              <span className={styles.itemValor}>Sucre, Bolivia</span>
            </div>
          </div>
        </div>
        <a
          href="https://wa.me/59171234567"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnWhatsapp}
        >
          Cotizar por WhatsApp
        </a>
      </div>
      <div className={styles.mapa}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60956.27255848573!2d-65.27957!3d-19.04327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93fdb0e9d3e3e3e3%3A0x1234567890abcdef!2sSucre%2C%20Bolivia!5e0!3m2!1ses!2sbo!4v1620000000000!5m2!1ses!2sbo"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen
          loading="lazy"
          title="Ubicación SAM-TECNOLOGÍA"
        />
      </div>
    </section>
  )
}

export default Contacto