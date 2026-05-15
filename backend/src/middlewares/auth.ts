import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'

export const authMiddleware = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET ?? 'sam-tecnologia-secret'
    })
  )
  .derive(async ({ jwt, headers, set }) => {
    const token = headers.authorization?.replace('Bearer ', '')

    if (!token) {
      set.status = 401
      throw new Error('Token requerido')
    }

    const payload = await jwt.verify(token)

    if (!payload) {
      set.status = 401
      throw new Error('Token invalido')
    }

    return { admin: payload }
  })