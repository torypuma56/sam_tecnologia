//conexion a la base de datos turso

import { createClient } from '@libsql/client'

export const db = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
})

console.log('🗄️ Turso conectado ✅')