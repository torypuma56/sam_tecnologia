import { useState, useEffect, useCallback, useMemo } from 'react'
import styles from './adminServicios.module.css'
import { API } from '../../config/api'

type Servicio = {
  id: number
  nombre: string
  descripcion: string
  icono: string
  precio_referencial: number | null
  estado: string
}

function AdminServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [servicioEditar, setServicioEditar] = useState<Servicio | null>(null)
  const [cargando, setCargando] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    icono: '',
    precio_referencial: '',
    estado: 'activo'
  })

  const token = localStorage.getItem('token')
  const headers = useMemo(
    () => ({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }),
    [token]
  )

  const cargarServicios = useCallback(() => {
    fetch(`${API}/servicios`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.success) setServicios(data.data)
      })
      .catch(() => {})
  }, [headers])

  useEffect(() => {
    cargarServicios()
  }, [cargarServicios])

  const abrirModal = (servicio?: Servicio) => {
    if (servicio) {
      setServicioEditar(servicio)
      setForm({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        icono: servicio.icono,
        precio_referencial: servicio.precio_referencial ? String(servicio.precio_referencial) : '',
        estado: servicio.estado
      })
    } else {
      setServicioEditar(null)
      setForm({
        nombre: '',
        descripcion: '',
        icono: '',
        precio_referencial: '',
        estado: 'activo'
      })
    }
    setModalAbierto(true)
  }

  const guardarServicio = async () => {
    setCargando(true)
    const body = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      icono: form.icono,
      precio_referencial: form.precio_referencial ? Number(form.precio_referencial) : null,
      estado: form.estado
    }

    const url = servicioEditar
      ? `${API}/servicios/${servicioEditar.id}`
      : `${API}/servicios`

    const method = servicioEditar ? 'PUT' : 'POST'

    await fetch(url, { method, headers, body: JSON.stringify(body) })
    setCargando(false)
    setModalAbierto(false)
    cargarServicios()
  }

  const eliminarServicio = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return
    await fetch(`${API}/servicios/${id}`, {
      method: 'DELETE',
      headers
    })
    cargarServicios()
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>🔧 Servicios</h1>
        <button className={styles.btnNuevo} onClick={() => abrirModal()}>
          + Nuevo servicio
        </button>
      </div>

      <div className={styles.tabla}>
        <div className={styles.tablaHeader}>
          <span>Icono</span>
          <span>Nombre</span>
          <span>Descripción</span>
          <span>Precio ref.</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>
        {servicios.length === 0 ? (
          <p className={styles.vacio}>No hay servicios aún</p>
        ) : (
          servicios.map(servicio => (
            <div key={servicio.id} className={styles.tablaFila}>
              <span className={styles.icono}>{servicio.icono}</span>
              <span>{servicio.nombre}</span>
              <span className={styles.descripcion}>{servicio.descripcion}</span>
              <span>{servicio.precio_referencial ? `Bs. ${servicio.precio_referencial}` : 'A cotizar'}</span>
              <span className={`${styles.estado} ${servicio.estado === 'activo' ? styles.activo : styles.inactivo}`}>
                {servicio.estado}
              </span>
              <div className={styles.acciones}>
                <button onClick={() => abrirModal(servicio)} className={styles.btnEditar}>✏️</button>
                <button onClick={() => eliminarServicio(servicio.id)} className={styles.btnEliminar}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalAbierto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{servicioEditar ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
              <button onClick={() => setModalAbierto(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.campo}>
                <label>Nombre</label>
                <input
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Nombre del servicio"
                />
              </div>
              <div className={styles.campo}>
                <label>Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="Descripción del servicio"
                  rows={3}
                />
              </div>
              <div className={styles.fila}>
                <div className={styles.campo}>
                  <label>Icono (emoji)</label>
                  <input
                    value={form.icono}
                    onChange={e => setForm({ ...form, icono: e.target.value })}
                    placeholder="📷"
                  />
                </div>
                <div className={styles.campo}>
                  <label>Precio referencial (Bs.)</label>
                  <input
                    type="number"
                    value={form.precio_referencial}
                    onChange={e => setForm({ ...form, precio_referencial: e.target.value })}
                    placeholder="Dejar vacío si es a cotizar"
                  />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Estado</label>
                <select
                  value={form.estado}
                  onChange={e => setForm({ ...form, estado: e.target.value })}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setModalAbierto(false)} className={styles.btnCancelar}>
                Cancelar
              </button>
              <button onClick={guardarServicio} className={styles.btnGuardar} disabled={cargando}>
                {cargando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminServicios