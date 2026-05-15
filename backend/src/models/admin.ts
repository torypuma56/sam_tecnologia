import { db } from '../config/db'
import bcrypt from 'bcryptjs'
import type { Admin } from '../types'

export class AdminModel {
  static async getByEmail(email: string): Promise<Admin | null> {
    const result = await db.execute({
      sql: `SELECT * FROM admin WHERE email = ?`,
      args: [email]
    })
    return result.rows[0] as unknown as Admin ?? null
  }

  static async create(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10)
    const result = await db.execute({
      sql: `INSERT INTO admin (email, password) VALUES (?, ?)`,
      args: [email, hash]
    })
    return result
  }

  static async verificarPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}