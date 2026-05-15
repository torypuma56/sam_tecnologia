import { Elysia, t } from 'elysia'
import {
  getServicios,
  getServicioById,
  createServicio,
  updateServicio,
  deleteServicio
} from '../controllers/servicios'

export const serviciosRoutes = new Elysia({ prefix: '/servicios' })

  .get('/', async () => {
    const servicios = await getServicios()
    return { success: true, data: servicios }
  })

  .get('/:id', async ({ params }) => {
    const servicio = await getServicioById(Number(params.id))
    if (!servicio) return { success: false, message: 'Servicio no encontrado' }
    return { success: true, data: servicio }
  })

  .post('/', async ({ body }) => {
    const servicio = await createServicio(body)
    return { success: true, data: servicio }
  }, {
    body: t.Object({
      nombre:             t.String(),
      descripcion:        t.String(),
      icono:              t.String(),
      precio_referencial: t.Optional(t.Number()),
      estado:             t.Optional(t.String())
    })
  })

  .put('/:id', async ({ params, body }) => {
    const servicio = await updateServicio(Number(params.id), body)
    return { success: true, data: servicio }
  }, {
    body: t.Object({
      nombre:             t.Optional(t.String()),
      descripcion:        t.Optional(t.String()),
      icono:              t.Optional(t.String()),
      precio_referencial: t.Optional(t.Number()),
      estado:             t.Optional(t.String())
    })
  })

  .delete('/:id', async ({ params }) => {
    await deleteServicio(Number(params.id))
    return { success: true, message: 'Servicio eliminado' }
  })