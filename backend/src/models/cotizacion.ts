import { db } from '../config/db'
import type { Cotizacion } from '../types'

export class CotizacionModel {
  static async getAll(): Promise<Cotizacion[]> {
    const result = await db.execute(`
      SELECT * FROM cotizaciones
      ORDER BY created_at DESC
    `)
    return result.rows as unknown as Cotizacion[]
  }

  static async getById(id: number): Promise<Cotizacion | null> {
    const cotizacion = await db.execute({
      sql: `SELECT * FROM cotizaciones WHERE id = ?`,
      args: [id]
    })

    const items = await db.execute({
      sql: `
        SELECT ci.*,
               p.nombre as producto_nombre,
               s.nombre as servicio_nombre
        FROM cotizacion_items ci
        LEFT JOIN productos p ON ci.producto_id = p.id
        LEFT JOIN servicios s ON ci.servicio_id = s.id
        WHERE ci.cotizacion_id = ?
      `,
      args: [id]
    })

    if (!cotizacion.rows[0]) return null

    return {
      ...cotizacion.rows[0],
      items: items.rows
    } as unknown as Cotizacion
  }

  static async create(data: Cotizacion) {
    const result = await db.execute({
      sql: `
        INSERT INTO cotizaciones (nombre, telefono, email, mensaje)
        VALUES (?, ?, ?, ?)
      `,
      args: [data.nombre, data.telefono, data.email, data.mensaje]
    })

    const cotizacionId = Number(result.lastInsertRowid)

    if (data.items.length > 0) {
      for (const item of data.items) {
        await db.execute({
          sql: `
            INSERT INTO cotizacion_items (cotizacion_id, producto_id, servicio_id, cantidad)
            VALUES (?, ?, ?, ?)
          `,
          args: [
            cotizacionId,
            item.producto_id ?? null,
            item.servicio_id ?? null,
            item.cantidad
          ]
        })
      }
    }

    return result
  }

  static async updateEstado(id: number, estado: string) {
    const result = await db.execute({
      sql: `UPDATE cotizaciones SET estado = ? WHERE id = ?`,
      args: [estado, id]
    })
    return result
  }

  static async delete(id: number) {
    const result = await db.execute({
      sql: `DELETE FROM cotizaciones WHERE id = ?`,
      args: [id]
    })
    return result
  }
}