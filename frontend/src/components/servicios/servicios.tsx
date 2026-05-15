import styles from './servicios.module.css'

const serviciosData = [
  {
    icono: '📷',
    nombre: 'Instalación de Cámaras',
    descripcion: 'Instalación profesional en hogares, negocios y empresas con garantía de calidad.',
  },
  {
    icono: '🔧',
    nombre: 'Mantenimiento',
    descripcion: 'Servicio técnico, revisión y mantenimiento preventivo y correctivo.',
  },
  {
    icono: '🖥️',
    nombre: 'Configuración DVR/NVR',
    descripcion: 'Configuración y optimización de grabadores para acceso remoto.',
  },
  {
    icono: '🌐',
    nombre: 'Cableado Estructurado',
    descripcion: 'Instalación de cableado de red para sistemas de videovigilancia.',
  },
]

function Servicios() {
  return (
    <section className={styles.servicios} id="servicios">
      <div className={styles.header}>
        <h2>Nuestros <span className={styles.accent}>Servicios</span></h2>
        <p>Soluciones completas para tu seguridad</p>
      </div>
      <div className={styles.grid}>
        {serviciosData.map((servicio, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icono}>{servicio.icono}</div>
            <h3>{servicio.nombre}</h3>
            <p>{servicio.descripcion}</p>
            <span className={styles.link}>Más información →</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Servicios