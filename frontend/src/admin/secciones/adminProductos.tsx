import { useState, useEffect } from 'react'
import styles from './adminProductos.module.css'

type Producto = {
  id: number
  nombre: string
  descripcion: string
  categoria_id: number
  categoria: string
  precio: number
  imagen: string
  stock: number
  estado: string
}

type Categoria = {
  id: number
  nombre: string
}

function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null)
  const [cargando, setCargando] = useState(false)
  const [subiendo, setSubiendo] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria_id: '',
    precio: '',
    imagen: '',
    stock: '',
    estado: 'activo'
  })

  const token = localStorage.getItem('token')
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  useEffect(() => {
    cargarProductos()
    cargarCategorias()
  }, [])

  const cargarProductos = async () => {
    const res = await fetch('http://localhost:3000/productos', { headers })
    const data = await res.json()
    if (data.success) setProductos(data.data)
  }

  const cargarCategorias = async () => {
    const res = await fetch('http://localhost:3000/categorias', { headers })
    const data = await res.json()
    if (data.success) setCategorias(data.data)
  }

  const abrirModal = (producto?: Producto) => {
    if (producto) {
      setProductoEditar(producto)
      setForm({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoria_id: String(producto.categoria_id),
        precio: String(producto.precio),
        imagen: producto.imagen,
        stock: String(producto.stock),
        estado: producto.estado
      })
    } else {
      setProductoEditar(null)
      setForm({
        nombre: '',
        descripcion: '',
        categoria_id: '',
        precio: '',
        imagen: '',
        stock: '',
        estado: 'activo'
      })
    }
    setModalAbierto(true)
  }

  const subirImagen = async (archivo: File) => {
    setSubiendo(true)
    const formData = new FormData()
    formData.append('archivo', archivo)

    const res = await fetch('http://localhost:3000/upload/imagen', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    const data = await res.json()
    setSubiendo(false)

    if (data.success) {
      setForm(prev => ({ ...prev, imagen: data.data.url }))
    }
  }

  const guardarProducto = async () => {
    setCargando(true)
    const body = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      categoria_id: Number(form.categoria_id),
      precio: Number(form.precio),
      imagen: form.imagen,
      stock: Number(form.stock),
      estado: form.estado
    }

    const url = productoEditar
      ? `http://localhost:3000/productos/${productoEditar.id}`
      : 'http://localhost:3000/productos'

    const method = productoEditar ? 'PUT' : 'POST'

    await fetch(url, { method, headers, body: JSON.stringify(body) })
    setCargando(false)
    setModalAbierto(false)
    cargarProductos()
  }

  const eliminarProducto = async (id: number) => {
    if (!confirm('Estas seguro de eliminar este producto?')) return
    await fetch(`http://localhost:3000/productos/${id}`, {
      method: 'DELETE',
      headers
    })
    cargarProductos()
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Productos</h1>
        <button className={styles.btnNuevo} onClick={() => abrirModal()}>
          + Nuevo producto
        </button>
      </div>

      <div className={styles.tabla}>
        <div className={styles.tablaHeader}>
          <span>Imagen</span>
          <span>Nombre</span>
          <span>Categoria</span>
          <span>Precio</span>
          <span>Stock</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>
        {productos.length === 0 ? (
          <p className={styles.vacio}>No hay productos aun</p>
        ) : (
          productos.map(producto => (
            <div key={producto.id} className={styles.tablaFila}>
              {producto.imagen ? (
                <img src={producto.imagen} alt={producto.nombre} className={styles.tablaImg} />
              ) : (
                <div className={styles.sinImagen}>📷</div>
              )}
              <span>{producto.nombre}</span>
              <span>{producto.categoria}</span>
              <span>Bs. {producto.precio}</span>
              <span className={producto.stock === 0 ? styles.sinStock : ''}>
                {producto.stock === 0 ? 'Sin stock' : producto.stock}
              </span>
              <span className={`${styles.estado} ${producto.estado === 'activo' ? styles.activo : styles.inactivo}`}>
                {producto.estado}
              </span>
              <div className={styles.acciones}>
                <button onClick={() => abrirModal(producto)} className={styles.btnEditar}>✏️</button>
                <button onClick={() => eliminarProducto(producto.id)} className={styles.btnEliminar}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalAbierto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{productoEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button onClick={() => setModalAbierto(false)}>X</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.campo}>
                <label>Nombre</label>
                <input
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Nombre del producto"
                />
              </div>
              <div className={styles.campo}>
                <label>Descripcion</label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="Descripcion del producto"
                  rows={3}
                />
              </div>
              <div className={styles.fila}>
                <div className={styles.campo}>
                  <label>Categoria</label>
                  <select
                    value={form.categoria_id}
                    onChange={e => setForm({ ...form, categoria_id: e.target.value })}
                  >
                    <option value="">Seleccionar</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.campo}>
                  <label>Precio (Bs.)</label>
                  <input
                    type="number"
                    value={form.precio}
                    onChange={e => setForm({ ...form, precio: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className={styles.fila}>
                <div className={styles.campo}>
                  <label>Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })}
                    placeholder="0"
                  />
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
              <div className={styles.campo}>
                <label>Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files?.[0]) subirImagen(e.target.files[0])
                  }}
                />
                {subiendo && <p className={styles.subiendo}>Subiendo imagen...</p>}
                {form.imagen && (
                  <img src={form.imagen} alt="preview" className={styles.preview} />
                )}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setModalAbierto(false)} className={styles.btnCancelar}>
                Cancelar
              </button>
              <button onClick={guardarProducto} className={styles.btnGuardar} disabled={cargando}>
                {cargando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProductos