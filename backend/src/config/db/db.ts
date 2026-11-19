//conexion a la base de datos turso

import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema })

console.log('🗄️ Turso conectado ✅')
