import { db } from '../config/db/db'
import { servicios } from '../config/db/schema'
import { desc, eq } from 'drizzle-orm'
import type { Servicio } from '../types'

export class ServicioModel {
  static async getAll(): Promise<Servicio[]> {
    const rows = await db
      .select()
      .from(servicios)
      .orderBy(desc(servicios.created_at))
    return rows as unknown as Servicio[]
  }

  static async getById(id: number): Promise<Servicio | null> {
    const rows = await db
      .select()
      .from(servicios)
      .where(eq(servicios.id, id))
      .limit(1)
    return (rows[0] as unknown as Servicio) ?? null
  }

  static async create(data: Servicio) {
    const rows = await db
      .insert(servicios)
      .values({
        nombre: data.nombre,
        descripcion: data.descripcion,
        icono: data.icono,
        precio_referencial: data.precio_referencial ?? null,
        estado: data.estado ?? 'activo'
      })
      .returning()
    return rows[0]
  }

  static async update(id: number, data: Partial<Servicio>) {
    const values: Partial<typeof servicios.$inferInsert> = {}
    if (data.nombre != null) values.nombre = data.nombre
    if (data.descripcion != null) values.descripcion = data.descripcion
    if (data.icono != null) values.icono = data.icono
    if (data.precio_referencial != null) values.precio_referencial = data.precio_referencial
    if (data.estado != null) values.estado = data.estado

    return await db
      .update(servicios)
      .set(values)
      .where(eq(servicios.id, id))
      .returning()
  }

  static async delete(id: number) {
    return await db.delete(servicios).where(eq(servicios.id, id))
  }
}
