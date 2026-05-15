import { db } from '../config/db'
import type { Configuracion } from '../types'

export class ConfiguracionModel {
  static async get(): Promise<Configuracion | null> {
    const result = await db.execute(`
      SELECT * FROM configuracion
      ORDER BY id DESC
      LIMIT 1
    `)
    return result.rows[0] as unknown as Configuracion ?? null
  }

  static async update(data: Partial<Configuracion>) {
    const result = await db.execute({
      sql: `
        UPDATE configuracion
        SET whatsapp   = COALESCE(?, whatsapp),
            qr_imagen  = COALESCE(?, qr_imagen),
            updated_at = datetime('now')
        WHERE id = 1
      `,
      args: [
        data.whatsapp ?? null,
        data.qr_imagen ?? null
      ]
    })
    return result
  }
}