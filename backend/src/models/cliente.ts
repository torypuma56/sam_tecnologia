import { db } from '../config/db'
import type { Cliente } from '../types'

export class ClienteModel {
  static async getAll(): Promise<Cliente[]> {
    const result = await db.execute(`
      SELECT * FROM clientes
      ORDER BY created_at DESC
    `)
    return result.rows as unknown as Cliente[]
  }

  static async getById(id: number): Promise<Cliente | null> {
    const result = await db.execute({
      sql: `SELECT * FROM clientes WHERE id = ?`,
      args: [id]
    })
    return (result.rows[0] as unknown as Cliente) || null
  }

  static async getByEmail(email: string): Promise<Cliente | null> {
    const result = await db.execute({
      sql: `SELECT * FROM clientes WHERE email = ?`,
      args: [email]
    })
    return (result.rows[0] as unknown as Cliente) || null
  }

  static async findOrCreate(data: Cliente): Promise<number> {
    const existing = await this.getByEmail(data.email)
    if (existing?.id) return existing.id

    const result = await db.execute({
      sql: `
        INSERT INTO clientes (nombre, telefono, email)
        VALUES (?, ?, ?)
      `,
      args: [data.nombre, data.telefono, data.email]
    })
    return Number(result.lastInsertRowid)
  }

  static async create(data: Cliente) {
    const result = await db.execute({
      sql: `
        INSERT INTO clientes (nombre, telefono, email)
        VALUES (?, ?, ?)
      `,
      args: [data.nombre, data.telefono, data.email]
    })
    return result
  }

  static async update(id: number, data: Partial<Cliente>) {
    const result = await db.execute({
      sql: `
        UPDATE clientes
        SET nombre = COALESCE(?, nombre),
            telefono = COALESCE(?, telefono),
            email = COALESCE(?, email)
        WHERE id = ?
      `,
      args: [data.nombre ?? null, data.telefono ?? null, data.email ?? null, id]
    })
    return result
  }

  static async delete(id: number) {
    const result = await db.execute({
      sql: `DELETE FROM clientes WHERE id = ?`,
      args: [id]
    })
    return result
  }
}
