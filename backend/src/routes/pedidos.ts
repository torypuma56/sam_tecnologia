import { Elysia, t } from 'elysia'
import {
  getPedidos,
  getPedidoById,
  createPedido,
  updateEstadoPedido,
  deletePedido
} from '../controllers/pedidos'

export const pedidosRoutes = new Elysia({ prefix: '/pedidos' })

  .get('/', async () => {
    const pedidos = await getPedidos()
    return { success: true, data: pedidos }
  })

  .get('/:id', async ({ params }) => {
    const pedido = await getPedidoById(Number(params.id))
    if (!pedido) return { success: false, message: 'Pedido no encontrado' }
    return { success: true, data: pedido }
  })

  .post('/', async ({ body }) => {
    const pedido = await createPedido(body)
    return { success: true, data: pedido }
  }, {
    body: t.Object({
      nombre:      t.String(),
      telefono:    t.String(),
      email:       t.String(),
      direccion:   t.String(),
      metodo_pago: t.String(),
      comprobante: t.Optional(t.String()),
      total:       t.Number(),
      items: t.Array(t.Object({
        producto_id:     t.Number(),
        cantidad:        t.Number(),
        precio_unitario: t.Number(),
        subtotal:        t.Number()
      }))
    })
  })

  .put('/:id/estado', async ({ params, body }) => {
    await updateEstadoPedido(Number(params.id), body.estado)
    return { success: true, message: 'Estado actualizado' }
  }, {
    body: t.Object({
      estado: t.String()
    })
  })

  .delete('/:id', async ({ params }) => {
    await deletePedido(Number(params.id))
    return { success: true, message: 'Pedido eliminado' }
  })