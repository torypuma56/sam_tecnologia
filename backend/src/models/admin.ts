import { db } from '../config/db/db'
import { admin } from '../config/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import type { Admin } from '../types'

export class AdminModel {
  static async getByEmail(email: string): Promise<Admin | null> {
    const rows = await db
      .select()
      .from(admin)
      .where(eq(admin.email, email))
      .limit(1)
    return rows[0] ?? null
  }

  static async create(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10)
    const rows = await db
      .insert(admin)
      .values({ email, password: hash })
      .returning({ id: admin.id, email: admin.email, rol: admin.rol, estado: admin.estado, created_at: admin.created_at })
    return rows[0]
  }

  static async verificarPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
