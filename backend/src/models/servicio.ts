import { db } from '../config/db'
import type { Servicio } from '../types'

export class ServicioModel {
  static async getAll(): Promise<Servicio[]> {
    const result = await db.execute(`
      SELECT * FROM servicios
      ORDER BY created_at DESC
    `)
    return result.rows as unknown as Servicio[]
  }

  static async getById(id: number): Promise<Servicio | null> {
    const result = await db.execute({
      sql: `SELECT * FROM servicios WHERE id = ?`,
      args: [id]
    })
    return result.rows[0] as unknown as Servicio ?? null
  }

  static async create(data: Servicio) {
    const result = await db.execute({
      sql: `
        INSERT INTO servicios (nombre, descripcion, icono, precio_referencial, estado)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        data.nombre,
        data.descripcion,
        data.icono,
        data.precio_referencial ?? null,
        data.estado ?? 'activo'
      ]
    })
    return result
  }

  static async update(id: number, data: Partial<Servicio>) {
    const result = await db.execute({
      sql: `
        UPDATE servicios
        SET nombre             = COALESCE(?, nombre),
            descripcion        = COALESCE(?, descripcion),
            icono              = COALESCE(?, icono),
            precio_referencial = COALESCE(?, precio_referencial),
            estado             = COALESCE(?, estado)
        WHERE id = ?
      `,
      args: [
        data.nombre ?? null,
        data.descripcion ?? null,
        data.icono ?? null,
        data.precio_referencial ?? null,
        data.estado ?? null,
        id
      ]
    })
    return result
  }

  static async delete(id: number) {
    const result = await db.execute({
      sql: `DELETE FROM servicios WHERE id = ?`,
      args: [id]
    })
    return result
  }
}