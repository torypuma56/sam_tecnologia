import { db } from '../config/db'
import type { Categoria } from '../types'

export class CategoriaModel {
  static async getAll(): Promise<Categoria[]> {
    const result = await db.execute(`
      SELECT * FROM categorias
      ORDER BY nombre ASC
    `)
    return result.rows as unknown as Categoria[]
  }

  static async getById(id: number): Promise<Categoria | null> {
    const result = await db.execute({
      sql: `SELECT * FROM categorias WHERE id = ?`,
      args: [id]
    })
    return result.rows[0] as unknown as Categoria ?? null
  }

  static async create(nombre: string) {
    const result = await db.execute({
      sql: `INSERT INTO categorias (nombre) VALUES (?)`,
      args: [nombre]
    })
    return result
  }

  static async update(id: number, nombre: string) {
    const result = await db.execute({
      sql: `UPDATE categorias SET nombre = ? WHERE id = ?`,
      args: [nombre, id]
    })
    return result
  }

  static async delete(id: number) {
    const result = await db.execute({
      sql: `DELETE FROM categorias WHERE id = ?`,
      args: [id]
    })
    return result
  }
}