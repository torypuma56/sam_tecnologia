import { db } from '../config/db'
import type { Producto } from '../types'

export class ProductoModel {
  static async getAll(): Promise<Producto[]> {
    const result = await db.execute(`
      SELECT p.*, c.nombre as categoria
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      ORDER BY p.created_at DESC
    `)
    return result.rows as unknown as Producto[]
  }

  static async getNuevos(): Promise<Producto[]> {
    const result = await db.execute(`
      SELECT p.*, c.nombre as categoria
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE p.created_at >= datetime('now', '-30 days')
      AND p.estado = 'activo'
      ORDER BY p.created_at DESC
      LIMIT 8
    `)
    return result.rows as unknown as Producto[]
  }

  static async getById(id: number): Promise<Producto | null> {
    const result = await db.execute({
      sql: `
        SELECT p.*, c.nombre as categoria
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
        WHERE p.id = ?
      `,
      args: [id]
    })
    return result.rows[0] as unknown as Producto ?? null
  }

  static async create(data: Producto) {
    const result = await db.execute({
      sql: `
        INSERT INTO productos (nombre, descripcion, categoria_id, precio, imagen, stock, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        data.nombre,
        data.descripcion,
        data.categoria_id,
        data.precio,
        data.imagen,
        data.stock,
        data.estado ?? 'activo'
      ]
    })
    return result
  }

  static async update(id: number, data: Partial<Producto>) {
    const result = await db.execute({
      sql: `
        UPDATE productos
        SET nombre       = COALESCE(?, nombre),
            descripcion  = COALESCE(?, descripcion),
            categoria_id = COALESCE(?, categoria_id),
            precio       = COALESCE(?, precio),
            imagen       = COALESCE(?, imagen),
            stock        = COALESCE(?, stock),
            estado       = COALESCE(?, estado)
        WHERE id = ?
      `,
      args: [
        data.nombre ?? null,
        data.descripcion ?? null,
        data.categoria_id ?? null,
        data.precio ?? null,
        data.imagen ?? null,
        data.stock ?? null,
        data.estado ?? null,
        id
      ]
    })
    return result
  }

  static async delete(id: number) {
    const result = await db.execute({
      sql: `DELETE FROM productos WHERE id = ?`,
      args: [id]
    })
    return result
  }

  static async updateStock(id: number, cantidad: number) {
    const result = await db.execute({
      sql: `
        UPDATE productos
        SET stock = stock - ?
        WHERE id = ? AND stock >= ?
      `,
      args: [cantidad, id, cantidad]
    })
    return result
  }
}