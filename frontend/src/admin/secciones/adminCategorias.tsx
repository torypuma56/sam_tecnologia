import { useState, useEffect } from 'react'
import { API } from '../../config/api'
import styles from './adminCategorias.module.css'

type Categoria = {
  id: number
  nombre: string
  created_at: string
}

function AdminCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [nueva, setNueva] = useState('')
  const [editando, setEditando] = useState<Categoria | null>(null)
  const [cargando, setCargando] = useState(false)

  const token = localStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  const cargarCategorias = async () => {
    const res = await fetch(`${API}/categorias`, { headers })
    const data = await res.json()
    if (data.success) setCategorias(data.data)
  }

  const crearCategoria = async () => {
    if (!nueva.trim()) return
    setCargando(true)
    await fetch(`${API}/categorias`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ nombre: nueva })
    })
    setNueva('')
    setCargando(false)
    cargarCategorias()
  }

  const actualizarCategoria = async () => {
    if (!editando) return
    setCargando(true)
    await fetch(`${API}/categorias/${editando.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ nombre: editando.nombre })
    })
    setEditando(null)
    setCargando(false)
    cargarCategorias()
  }

  const eliminarCategoria = async (id: number) => {
    if (!confirm('Estas seguro de eliminar esta categoria?')) return
    await fetch(`${API}/categorias/${id}`, {
      method: 'DELETE',
      headers
    })
    cargarCategorias()
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Categorias</h1>
      </div>

      <div className={styles.contenido}>
        <div className={styles.formulario}>
          <h2>Nueva categoria</h2>
          <div className={styles.inputGroup}>
            <input
              value={nueva}
              onChange={e => setNueva(e.target.value)}
              placeholder="Nombre de la categoria"
              onKeyDown={e => e.key === 'Enter' && crearCategoria()}
            />
            <button
              onClick={crearCategoria}
              className={styles.btnAgregar}
              disabled={cargando || !nueva.trim()}
            >
              {cargando ? 'Agregando...' : '+ Agregar'}
            </button>
          </div>
        </div>

        <div className={styles.lista}>
          <h2>Categorias existentes</h2>
          {categorias.length === 0 ? (
            <p className={styles.vacio}>No hay categorias aun</p>
          ) : (
            categorias.map(categoria => (
              <div key={categoria.id} className={styles.item}>
                {editando?.id === categoria.id ? (
                  <input
                    className={styles.inputEditar}
                    value={editando.nombre}
                    onChange={e => setEditando({ ...editando, nombre: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && actualizarCategoria()}
                    autoFocus
                  />
                ) : (
                  <span className={styles.itemNombre}>{categoria.nombre}</span>
                )}
                <div className={styles.itemAcciones}>
                  {editando?.id === categoria.id ? (
                    <>
                      <button onClick={actualizarCategoria} className={styles.btnGuardar}>
                        Guardar
                      </button>
                      <button onClick={() => setEditando(null)} className={styles.btnCancelar}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditando(categoria)} className={styles.btnEditar}>
                        ✏️
                      </button>
                      <button onClick={() => eliminarCategoria(categoria.id)} className={styles.btnEliminar}>
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminCategorias