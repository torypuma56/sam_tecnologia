import { Elysia, t } from 'elysia'
import {
  getProductos,
  getProductosNuevos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from '../controllers/productos'

export const productosRoutes = new Elysia({ prefix: '/productos' })

  .get('/', async () => {
    const productos = await getProductos()
    return { success: true, data: productos }
  })

  .get('/nuevos', async () => {
    const productos = await getProductosNuevos()
    return { success: true, data: productos }
  })

  .get('/:id', async ({ params }) => {
    const producto = await getProductoById(Number(params.id))
    if (!producto) return { success: false, message: 'Producto no encontrado' }
    return { success: true, data: producto }
  })

  .post('/', async ({ body }) => {
    const producto = await createProducto(body)
    return { success: true, data: producto }
  }, {
    body: t.Object({
      nombre:       t.String(),
      descripcion:  t.String(),
      categoria_id: t.Number(),
      precio:       t.Number(),
      imagen:       t.String(),
      stock:        t.Number(),
      estado:       t.Optional(t.String())
    })
  })

  .put('/:id', async ({ params, body }) => {
    const producto = await updateProducto(Number(params.id), body)
    return { success: true, data: producto }
  }, {
    body: t.Object({
      nombre:       t.Optional(t.String()),
      descripcion:  t.Optional(t.String()),
      categoria_id: t.Optional(t.Number()),
      precio:       t.Optional(t.Number()),
      imagen:       t.Optional(t.String()),
      stock:        t.Optional(t.Number()),
      estado:       t.Optional(t.String())
    })
  })

  .delete('/:id', async ({ params }) => {
    await deleteProducto(Number(params.id))
    return { success: true, message: 'Producto eliminado' }
  })