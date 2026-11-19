import { db } from '../config/db/db'
import { clientes } from '../config/db/schema'
import { desc, eq } from 'drizzle-orm'
import type { Cliente } from '../types'

export class ClienteModel {
  static async getAll(): Promise<Cliente[]> {
    return await db
      .select()
      .from(clientes)
      .orderBy(desc(clientes.created_at))
  }

  static async getById(id: number): Promise<Cliente | null> {
    const rows = await db
      .select()
      .from(clientes)
      .where(eq(clientes.id, id))
      .limit(1)
    return rows[0] ?? null
  }

  static async getByEmail(email: string): Promise<Cliente | null> {
    const rows = await db
      .select()
      .from(clientes)
      .where(eq(clientes.email, email))
      .limit(1)
    return rows[0] ?? null
  }

  static async findOrCreate(data: Cliente): Promise<number> {
    const existing = await this.getByEmail(data.email)
    if (existing?.id) return existing.id

    const rows = await db
      .insert(clientes)
      .values({
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email
      })
      .returning({ id: clientes.id })
    return rows[0]!.id
  }

  static async create(data: Cliente) {
    const rows = await db
      .insert(clientes)
      .values({
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email
      })
      .returning()
    return rows[0]
  }

  static async update(id: number, data: Partial<Cliente>) {
    const values: Partial<typeof clientes.$inferInsert> = {}
    if (data.nombre != null) values.nombre = data.nombre
    if (data.telefono != null) values.telefono = data.telefono
    if (data.email != null) values.email = data.email

    return await db
      .update(clientes)
      .set(values)
      .where(eq(clientes.id, id))
      .returning()
  }

  static async delete(id: number) {
    return await db.delete(clientes).where(eq(clientes.id, id))
  }
}
