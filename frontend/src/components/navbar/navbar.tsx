import { useState } from 'react'
import styles from './navbar.module.css'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [temaOscuro, setTemaOscuro] = useState(true)

  const toggleTema = () => {
    setTemaOscuro(!temaOscuro)
    document.documentElement.setAttribute(
      'data-theme',
      temaOscuro ? 'light' : 'dark'
    )
  }

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      
      <div className={styles.logo}>
        <img 
          src="/logo2.png" 
          alt="SAM-TECNOLOGÍA" 
          className={styles.logo2Img}
  />
  <span className={styles.logoText}>
    SAM-<span className={styles.logoAccent}>TECNOLOGÍA</span>
  </span>
</div>

      {/* Links desktop */}
      <ul className={styles.navLinks}>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#cotizacion">Cotización</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>



      {/* Derecha */}
      <div className={styles.navRight}>
        <button className={styles.temaBtn} onClick={toggleTema}>
          {temaOscuro ? '☀️' : '🌙'}
        </button>
        <a href="#cotizacion" className={styles.btnCotizar}>
          Cotizar Ahora
        </a>
        {/* Hamburguesa */}
        <button className={styles.hamburger} onClick={toggleMenu}>
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className={styles.menuMovil}>
          <ul>
            <li><a href="#inicio" onClick={toggleMenu}>Inicio</a></li>
            <li><a href="#servicios" onClick={toggleMenu}>Servicios</a></li>
            <li><a href="#productos" onClick={toggleMenu}>Productos</a></li>
            <li><a href="#cotizacion" onClick={toggleMenu}>Cotización</a></li>
            <li><a href="#contacto" onClick={toggleMenu}>Contacto</a></li>
          </ul>
          <button className={styles.temaMovil} onClick={toggleTema}>
            {temaOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro'}
          </button>
          <a href="#cotizacion" className={styles.btnCotizarMovil} onClick={toggleMenu}>
            Cotizar Ahora
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar