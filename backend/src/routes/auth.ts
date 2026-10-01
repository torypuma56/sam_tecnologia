import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { login, crearAdmin } from '../controllers/auth'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!
    })
  )

  .post('/login', async ({ body, jwt }) => {
    const result = await login(body.email, body.password)

    if (!result.success) {
      return { success: false, message: result.message }
    }

    const token = await jwt.sign({
      id: String(result.data!.id),
      email: String(result.data!.email)
    })

    return { success: true, token }
  }, {
    body: t.Object({
      email:    t.String(),
      password: t.String()
    })
  })

  // Solo disponible en desarrollo
  .post('/registro', async ({ body }) => {
    if (process.env.NODE_ENV === 'production') {
      return { success: false, message: 'Ruta no disponible' }
    }
    const result = await crearAdmin(body.email, body.password)
    return { success: true, data: result }
  }, {
    body: t.Object({
      email:    t.String(),
      password: t.String()
    })
  })