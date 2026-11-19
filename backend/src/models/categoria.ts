import { db } from '../config/db/db'
import { categorias } from '../config/db/schema'
import { asc, eq } from 'drizzle-orm'
import type { Categoria } from '../types'

export class CategoriaModel {
  static async getAll(): Promise<Categoria[]> {
    const rows = await db
      .select()
      .from(categorias)
      .orderBy(asc(categorias.nombre))
    return rows as unknown as Categoria[]
  }

  static async getById(id: number): Promise<Categoria | null> {
    const rows = await db
      .select()
      .from(categorias)
      .where(eq(categorias.id, id))
      .limit(1)
    return (rows[0] as unknown as Categoria) ?? null
  }

  static async create(nombre: string) {
    const rows = await db
      .insert(categorias)
      .values({ nombre })
      .returning()
    return rows[0]
  }

  static async update(id: number, nombre: string) {
    return await db
      .update(categorias)
      .set({ nombre })
      .where(eq(categorias.id, id))
      .returning()
  }

  static async delete(id: number) {
    return await db.delete(categorias).where(eq(categorias.id, id))
  }
}
