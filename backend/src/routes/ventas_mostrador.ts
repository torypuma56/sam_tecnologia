import { Elysia, t } from 'elysia'
import {
  getVentasMostrador,
  getVentaMostradorById,
  createVentaMostrador,
  deleteVentaMostrador
} from '../controllers/ventas_mostrador'

export const ventasMostradorRoutes = new Elysia({ prefix: '/ventas-mostrador' })

  .get('/', async () => {
    const ventas = await getVentasMostrador()
    return { success: true, data: ventas }
  })

  .get('/:id', async ({ params }) => {
    const venta = await getVentaMostradorById(Number(params.id))
    if (!venta) return { success: false, message: 'Venta no encontrada' }
    return { success: true, data: venta }
  })

  .post('/', async ({ body }) => {
    const venta = await createVentaMostrador({
      ...body,
      admin_id: 1
    })
    return { success: true, data: venta }
  }, {
    body: t.Object({
      cliente_id: t.Optional(t.Number()),
      metodo_pago: t.String(),
      total: t.Number(),
      items: t.Array(t.Object({
        producto_id: t.Optional(t.Number()),
        descripcion_libre: t.Optional(t.String()),
        cantidad: t.Number(),
        precio_unitario: t.Number(),
        subtotal: t.Number()
      }))
    })
  })

  .delete('/:id', async ({ params }) => {
    await deleteVentaMostrador(Number(params.id))
    return { success: true, message: 'Venta eliminada' }
  })
