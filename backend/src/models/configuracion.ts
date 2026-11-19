import { db } from '../config/db/db'
import { configuracion } from '../config/db/schema'
import { eq, sql } from 'drizzle-orm'
import type { SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core'
import type { Configuracion } from '../types'

export class ConfiguracionModel {
  static async get(): Promise<Configuracion | null> {
    const rows = await db
      .select()
      .from(configuracion)
      .where(eq(configuracion.id, 1))
      .limit(1)
    return (rows[0] as unknown as Configuracion) ?? null
  }

  static async update(data: Partial<Configuracion>) {
    const values: SQLiteUpdateSetSource<typeof configuracion> = {
      updated_at: sql`datetime('now')`
    }
    if (data.whatsapp != null) values.whatsapp = data.whatsapp
    if (data.qr_imagen != null) values.qr_imagen = data.qr_imagen
    if (data.updated_by != null) values.updated_by = data.updated_by

    return await db
      .update(configuracion)
      .set(values)
      .where(eq(configuracion.id, 1))
      .returning()
  }
}
