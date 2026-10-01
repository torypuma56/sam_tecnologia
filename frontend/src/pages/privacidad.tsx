import styles from './privacidad.module.css'
import { useNavigate } from 'react-router-dom'

function Privacidad() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.contenido}>
        <button onClick={() => navigate(-1)} className={styles.btnVolver}>
          ← Volver
        </button>

        <h1>Política de Privacidad</h1>
        <p className={styles.fecha}>Última actualización: Mayo 2026</p>

        <section>
          <h2>1. Información que recopilamos</h2>
          <p>Recopilamos la siguiente información cuando realizas una cotización o pedido:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Número de teléfono / WhatsApp</li>
            <li>Correo electrónico</li>
            <li>Dirección de entrega</li>
            <li>Comprobante de pago (cuando aplica)</li>
          </ul>
        </section>

        <section>
          <h2>2. Uso de la información</h2>
          <p>Utilizamos tu información únicamente para:</p>
          <ul>
            <li>Procesar y gestionar tu pedido o cotización</li>
            <li>Contactarte para confirmar tu pedido</li>
            <li>Enviarte información sobre el estado de tu pedido</li>
            <li>Mejorar nuestros servicios</li>
          </ul>
        </section>

        <section>
          <h2>3. Compartir información</h2>
          <p>
            No vendemos, alquilamos ni compartimos tu información personal con terceros.
            Tu información es utilizada exclusivamente por SAM-TECNOLOGÍA para los fines
            descritos en esta política.
          </p>
        </section>

        <section>
          <h2>4. Seguridad de los datos</h2>
          <p>
            Implementamos medidas de seguridad para proteger tu información personal.
            Sin embargo, ningún método de transmisión por internet es 100% seguro.
          </p>
        </section>

        <section>
          <h2>5. Retención de datos</h2>
          <p>
            Conservamos tu información mientras sea necesaria para brindarte nuestros
            servicios. Puedes solicitar la eliminación de tus datos contactándonos
            directamente.
          </p>
        </section>

        <section>
          <h2>6. Tus derechos</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li>Acceder a tu información personal</li>
            <li>Solicitar corrección de datos incorrectos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tus datos</li>
          </ul>
        </section>

        <section>
          <h2>7. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política, contáctanos:
          </p>
          <ul>
            <li>Email: samtecnologia10@gmail.com</li>
            <li>WhatsApp: +591 64337000</li>
            <li>Ubicación: Sucre, Bolivia</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Privacidad