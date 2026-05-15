import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './dashboard.module.css'
import AdminProductos from './secciones/adminProductos'
import AdminServicios from './secciones/adminServicios'
import AdminCotizaciones from './secciones/adminCotizaciones'
import AdminPedidos from './secciones/adminPedidos'
import AdminConfiguracion from './secciones/adminConfiguracion'

type Seccion = 'dashboard' | 'productos' | 'servicios' | 'cotizaciones' | 'pedidos' | 'configuracion'


function Dashboard() {
  const [seccion, setSeccion] = useState<Seccion>('dashboard')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/admin/login')
  }, [navigate])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoTexto}>
            SAM-<span className={styles.accent}>TECNOLOGÍA</span>
          </span>
          <p>Panel Admin</p>
        </div>

        <nav className={styles.nav}>
          <p className={styles.navLabel}>GENERAL</p>
          <button
            className={`${styles.navItem} ${seccion === 'dashboard' ? styles.navActivo : ''}`}
            onClick={() => setSeccion('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`${styles.navItem} ${seccion === 'cotizaciones' ? styles.navActivo : ''}`}
            onClick={() => setSeccion('cotizaciones')}
          >
            📝 Cotizaciones
          </button>
          <button
            className={`${styles.navItem} ${seccion === 'pedidos' ? styles.navActivo : ''}`}
            onClick={() => setSeccion('pedidos')}
          >
            🛒 Pedidos
          </button>

          <button
            className={`${styles.navItem} ${seccion === 'configuracion' ? styles.navActivo : ''}`}
            onClick={() => setSeccion('configuracion')}
          >
            Configuración
          </button>

          <p className={styles.navLabel}>CONTENIDO</p>
          <button
            className={`${styles.navItem} ${seccion === 'productos' ? styles.navActivo : ''}`}
            onClick={() => setSeccion('productos')}
          >
            📦 Productos
          </button>

          <button
            className={`${styles.navItem} ${seccion === 'servicios' ? styles.navActivo : ''}`}
            onClick={() => setSeccion('servicios')}
          >
            🔧 Servicios
          </button>

          <p className={styles.navLabel}>SITIO</p>
          <a href="/" className={styles.navItem} target="_blank">
            🌐 Ver sitio web
          </a>
        </nav>

        <button className={styles.btnCerrar} onClick={cerrarSesion}>
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* Contenido */}
      <main className={styles.main}>
        {seccion === 'dashboard' && <ResumenDashboard />}
        {seccion === 'productos' && <AdminProductos />}
        {seccion === 'servicios' && <AdminServicios />}
        {seccion === 'cotizaciones' && <AdminCotizaciones />}
        {seccion === 'pedidos' && <AdminPedidos />}
        {seccion === 'configuracion' && <AdminConfiguracion />}
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
      fetch('http://localhost:3000/productos', { headers }).then(r => r.json()),
      fetch('http://localhost:3000/servicios', { headers }).then(r => r.json()),
      fetch('http://localhost:3000/cotizaciones', { headers }).then(r => r.json()),
      fetch('http://localhost:3000/pedidos', { headers }).then(r => r.json()),
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
      <h1 className="titulo">Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '24px' }}>
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