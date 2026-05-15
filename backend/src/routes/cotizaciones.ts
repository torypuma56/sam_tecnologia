import { Elysia, t } from 'elysia'
import {
  getCotizaciones,
  getCotizacionById,
  createCotizacion,
  updateEstadoCotizacion,
  deleteCotizacion
} from '../controllers/cotizaciones'

export const cotizacionesRoutes = new Elysia({ prefix: '/cotizaciones' })

  .get('/', async () => {
    const cotizaciones = await getCotizaciones()
    return { success: true, data: cotizaciones }
  })

  .get('/:id', async ({ params }) => {
    const cotizacion = await getCotizacionById(Number(params.id))
    if (!cotizacion) return { success: false, message: 'Cotización no encontrada' }
    return { success: true, data: cotizacion }
  })

  .post('/', async ({ body }) => {
    const cotizacion = await createCotizacion(body)
    return { success: true, data: cotizacion }
  }, {
    body: t.Object({
      nombre:   t.String(),
      telefono: t.String(),
      email:    t.String(),
      mensaje:  t.String(),
      items: t.Array(t.Object({
        producto_id: t.Optional(t.Number()),
        servicio_id: t.Optional(t.Number()),
        cantidad:    t.Number()
      }))
    })
  })

  .put('/:id/estado', async ({ params, body }) => {
    await updateEstadoCotizacion(Number(params.id), body.estado)
    return { success: true, message: 'Estado actualizado' }
  }, {
    body: t.Object({
      estado: t.String()
    })
  })

  .delete('/:id', async ({ params }) => {
    await deleteCotizacion(Number(params.id))
    return { success: true, message: 'Cotización eliminada' }
  })