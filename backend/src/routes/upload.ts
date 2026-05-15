import { Elysia } from 'elysia'
import { uploadImagen, deleteImagen } from '../controllers/upload'

export const uploadRoutes = new Elysia({ prefix: '/upload' })

  .post('/imagen', async ({ body }) => {
    const { archivo } = body as { archivo: File }

    if (!archivo) {
      return { success: false, message: 'No se envió ningún archivo' }
    }

    const result = await uploadImagen(archivo)
    return { success: true, data: result }
  })

  .delete('/imagen/:public_id', async ({ params }) => {
    await deleteImagen(params.public_id)
    return { success: true, message: 'Imagen eliminada' }
  })