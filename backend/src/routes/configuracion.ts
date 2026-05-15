import { Elysia, t } from 'elysia'
import {
  getConfiguracion,
  updateConfiguracion
} from '../controllers/configuracion'

export const configuracionRoutes = new Elysia({ prefix: '/configuracion' })

  .get('/', async () => {
    const config = await getConfiguracion()
    return { success: true, data: config }
  })

  .put('/', async ({ body }) => {
    const config = await updateConfiguracion(body)
    return { success: true, data: config }
  }, {
    body: t.Object({
      whatsapp:  t.Optional(t.String()),
      qr_imagen: t.Optional(t.String())
    })
  })