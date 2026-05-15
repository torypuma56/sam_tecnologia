import { Elysia, t } from 'elysia'
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../controllers/categorias'

export const categoriasRoutes = new Elysia({ prefix: '/categorias' })

  .get('/', async () => {
    const categorias = await getCategorias()
    return { success: true, data: categorias }
  })

  .post('/', async ({ body }) => {
    const categoria = await createCategoria(body.nombre)
    return { success: true, data: categoria }
  }, {
    body: t.Object({
      nombre: t.String()
    })
  })

  .put('/:id', async ({ params, body }) => {
    const categoria = await updateCategoria(Number(params.id), body.nombre)
    return { success: true, data: categoria }
  }, {
    body: t.Object({
      nombre: t.String()
    })
  })

  .delete('/:id', async ({ params }) => {
    await deleteCategoria(Number(params.id))
    return { success: true, message: 'Categoría eliminada' }
  })