import { db } from '../config/db/db'
import { categorias, productos } from '../config/db/schema'
import { and, desc, eq, gte, sql } from 'drizzle-orm'
import type { Producto } from '../types'

export class ProductoModel {
  static async getAll(): Promise<Producto[]> {
    const rows = await db
      .select({
        id: productos.id,
        nombre: productos.nombre,
        descripcion: productos.descripcion,
        categoria_id: productos.categoria_id,
        precio: productos.precio,
        imagen: productos.imagen,
        stock: productos.stock,
        estado: productos.estado,
        created_at: productos.created_at,
        categoria: categorias.nombre
      })
      .from(productos)
      .innerJoin(categorias, eq(productos.categoria_id, categorias.id))
      .orderBy(desc(productos.created_at))
    return rows as unknown as Producto[]
  }

  static async getNuevos(): Promise<Producto[]> {
    const rows = await db
      .select({
        id: productos.id,
        nombre: productos.nombre,
        descripcion: productos.descripcion,
        categoria_id: productos.categoria_id,
        precio: productos.precio,
        imagen: productos.imagen,
        stock: productos.stock,
        estado: productos.estado,
        created_at: productos.created_at,
        categoria: categorias.nombre
      })
      .from(productos)
      .innerJoin(categorias, eq(productos.categoria_id, categorias.id))
      .where(
        and(
          gte(productos.created_at, sql`datetime('now', '-30 days')`),
          eq(productos.estado, 'activo')
        )
      )
      .orderBy(desc(productos.created_at))
      .limit(8)
    return rows as unknown as Producto[]
  }

  static async getById(id: number): Promise<Producto | null> {
    const rows = await db
      .select({
        id: productos.id,
        nombre: productos.nombre,
        descripcion: productos.descripcion,
        categoria_id: productos.categoria_id,
        precio: productos.precio,
        imagen: productos.imagen,
        stock: productos.stock,
        estado: productos.estado,
        created_at: productos.created_at,
        categoria: categorias.nombre
      })
      .from(productos)
      .innerJoin(categorias, eq(productos.categoria_id, categorias.id))
      .where(eq(productos.id, id))
      .limit(1)
    return (rows[0] as unknown as Producto) ?? null
  }

  static async create(data: Producto) {
    const rows = await db
      .insert(productos)
      .values({
        nombre: data.nombre,
        descripcion: data.descripcion,
        categoria_id: data.categoria_id,
        precio: data.precio,
        imagen: data.imagen,
        stock: data.stock,
        estado: data.estado ?? 'activo'
      })
      .returning()
    return rows[0]
  }

  static async update(id: number, data: Partial<Producto>) {
    const values: Partial<typeof productos.$inferInsert> = {}
    if (data.nombre != null) values.nombre = data.nombre
    if (data.descripcion != null) values.descripcion = data.descripcion
    if (data.categoria_id != null) values.categoria_id = data.categoria_id
    if (data.precio != null) values.precio = data.precio
    if (data.imagen != null) values.imagen = data.imagen
    if (data.stock != null) values.stock = data.stock
    if (data.estado != null) values.estado = data.estado

    return await db
      .update(productos)
      .set(values)
      .where(eq(productos.id, id))
      .returning()
  }

  static async delete(id: number) {
    return await db.delete(productos).where(eq(productos.id, id))
  }

  static async updateStock(id: number, cantidad: number) {
    return await db
      .update(productos)
      .set({ stock: sql`stock - ${cantidad}` })
      .where(and(eq(productos.id, id), gte(productos.stock, cantidad)))
  }
}
