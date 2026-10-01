import { Elysia, t } from 'elysia'
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clientes'

export const clientesRoutes = new Elysia({ prefix: '/clientes' })

  .get('/', async () => {
    const clientes = await getClientes()
    return { success: true, data: clientes }
  })

  .get('/:id', async ({ params }) => {
    const cliente = await getClienteById(Number(params.id))
    if (!cliente) return { success: false, message: 'Cliente no encontrado' }
    return { success: true, data: cliente }
  })

  .post('/', async ({ body }) => {
    const cliente = await createCliente(body)
    return { success: true, data: cliente }
  }, {
    body: t.Object({
      nombre:   t.String(),
      telefono: t.String(),
      email:    t.String()
    })
  })

  .put('/:id', async ({ params, body }) => {
    await updateCliente(Number(params.id), body)
    return { success: true, message: 'Cliente actualizado' }
  }, {
    body: t.Object({
      nombre:   t.Optional(t.String()),
      telefono: t.Optional(t.String()),
      email:    t.Optional(t.String())
    })
  })

  .delete('/:id', async ({ params }) => {
    await deleteCliente(Number(params.id))
    return { success: true, message: 'Cliente eliminado' }
  })
