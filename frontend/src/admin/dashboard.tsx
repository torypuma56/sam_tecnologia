import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './dashboard.module.css'
import AdminProductos from './secciones/adminProductos'
import AdminServicios from './secciones/adminServicios'
import AdminCotizaciones from './secciones/adminCotizaciones'
import AdminPedidos from './secciones/adminPedidos'
import AdminConfiguracion from './secciones/adminConfiguracion'
import { API } from '../config/api'
import AdminCategorias from './secciones/adminCategorias'

type Seccion = 'dashboard' | 'productos' | 'servicios' | 'cotizaciones' | 'pedidos' | 'configuracion' | 'categorias'

function Dashboard() {
  const [seccion, setSeccion] = useState<Seccion>('dashboard')
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const [temaOscuro, setTemaOscuro] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/admin/login')
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [navigate])

  const toggleTema = () => {
    setTemaOscuro(!temaOscuro)
    document.documentElement.setAttribute(
      'data-theme',
      temaOscuro ? 'light' : 'dark'
    )
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  const cambiarSeccion = (s: Seccion) => {
    setSeccion(s)
    setSidebarAbierto(false)
  }

  return (
    <div className={styles.dashboard}>
      {/* Navbar móvil */}
      <div className={styles.navbarMovil}>
        <span className={styles.logoTexto}>
          SAM-<span className={styles.accent}>TECNOLOGÍA</span>
        </span>
        <button
          className={styles.hamburger}
          onClick={() => setSidebarAbierto(!sidebarAbierto)}
        >
          {sidebarAbierto ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay móvil */}
      {sidebarAbierto && (
        <div
          className={styles.overlayVisible}
          onClick={() => setSidebarAbierto(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarAbierto ? styles.sidebarAbierto : ''}`}>
        <div className={styles.sidebarLogo}>
          <div>
            <span className={styles.logoTexto}>
              SAM-<span className={styles.accent}>TECNOLOGÍA</span>
            </span>
            <p>Panel Admin</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <p className={styles.navLabel}>GENERAL</p>
          <button
            className={`${styles.navItem} ${seccion === 'dashboard' ? styles.navActivo : ''}`}
            onClick={() => cambiarSeccion('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`${styles.navItem} ${seccion === 'cotizaciones' ? styles.navActivo : ''}`}
            onClick={() => cambiarSeccion('cotizaciones')}
          >
            📝 Cotizaciones
          </button>
          <button
            className={`${styles.navItem} ${seccion === 'pedidos' ? styles.navActivo : ''}`}
            onClick={() => cambiarSeccion('pedidos')}
          >
            🛒 Pedidos
          </button>

          <p className={styles.navLabel}>CONTENIDO</p>
          <button
            className={`${styles.navItem} ${seccion === 'productos' ? styles.navActivo : ''}`}
            onClick={() => cambiarSeccion('productos')}
          >
            📦 Productos
          </button>

          <button
           className={`${styles.navItem} ${seccion === 'categorias' ? styles.navActivo : ''}`}
            onClick={() => cambiarSeccion('categorias')}
          >
            🏷️ Categorias
          </button>
          <button
            className={`${styles.navItem} ${seccion === 'servicios' ? styles.navActivo : ''}`}
            onClick={() => cambiarSeccion('servicios')}
          >
            🔧 Servicios
          </button>
          <button
            className={`${styles.navItem} ${seccion === 'configuracion' ? styles.navActivo : ''}`}
            onClick={() => cambiarSeccion('configuracion')}
          >
            ⚙️ Configuracion
          </button>

          <p className={styles.navLabel}>SITIO</p>
          <a href="/" className={styles.navItem} target="_blank">
            🌐 Ver sitio web
          </a>
        </nav>

        <div className={styles.navFooter}>
          <button className={styles.btnTema} onClick={toggleTema}>
            {temaOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro'}
          </button>
          <button className={styles.btnCerrar} onClick={cerrarSesion}>
            🚪 Cerrar sesion
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className={styles.main}>
        {seccion === 'dashboard' && <ResumenDashboard />}
        {seccion === 'productos' && <AdminProductos />}
        {seccion === 'servicios' && <AdminServicios />}
        {seccion === 'cotizaciones' && <AdminCotizaciones />}
        {seccion === 'pedidos' && <AdminPedidos />}
        {seccion === 'configuracion' && <AdminConfiguracion />}
        {seccion === 'categorias' && <AdminCategorias />}
      </main>
    </div>
  )
}

function ResumenDashboard() {
  const [stats, setStats] = useState({
    productos: 0,
    servicios: 0,
    cotizaciones: 0,
    pedidos: 0
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }

    Promise.all([
      fetch(`${API}/productos`, { headers }).then(r => r.json()),
      fetch(`${API}/servicios`, { headers }).then(r => r.json()),
      fetch(`${API}/cotizaciones`, { headers }).then(r => r.json()),
      fetch(`${API}/pedidos`, { headers }).then(r => r.json()),
    ]).then(([p, s, c, pe]) => {
      setStats({
        productos: p.data?.length ?? 0,
        servicios: s.data?.length ?? 0,
        cotizaciones: c.data?.length ?? 0,
        pedidos: pe.data?.length ?? 0
      })
    }).catch(() => {})
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)', marginBottom: '24px' }}>
        Dashboard
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
        <StatCard titulo="Productos" valor={stats.productos} icono="📦" color="var(--accent)" />
        <StatCard titulo="Servicios" valor={stats.servicios} icono="🔧" color="var(--purple)" />
        <StatCard titulo="Cotizaciones" valor={stats.cotizaciones} icono="📝" color="#f59e0b" />
        <StatCard titulo="Pedidos" valor={stats.pedidos} icono="🛒" color="#10b981" />
      </div>
    </div>
  )
}

function StatCard({ titulo, valor, icono, color }: { titulo: string, valor: number, icono: string, color: string }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '24px',
    }}>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icono}</div>
      <div style={{ fontSize: '28px', fontWeight: '700', color }}>{valor}</div>
      <div style={{ fontSize: '14px', color: 'var(--text2)', marginTop: '4px' }}>{titulo}</div>
    </div>
  )
}

export default Dashboard