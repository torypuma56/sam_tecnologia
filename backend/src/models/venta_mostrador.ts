import { db } from '../config/db'
import type { VentaMostrador } from '../types'

export class VentaMostradorModel {
  static async getAll(): Promise<VentaMostrador[]> {
    const result = await db.execute(`
      SELECT vm.*, c.nombre as cliente_nombre
      FROM ventas_mostrador vm
      LEFT JOIN clientes c ON vm.cliente_id = c.id
      ORDER BY vm.created_at DESC
    `)
    return result.rows as unknown as VentaMostrador[]
  }

  static async getById(id: number): Promise<VentaMostrador | null> {
    const venta = await db.execute({
      sql: `
        SELECT vm.*, c.nombre as cliente_nombre, c.telefono as cliente_telefono
        FROM ventas_mostrador vm
        LEFT JOIN clientes c ON vm.cliente_id = c.id
        WHERE vm.id = ?
      `,
      args: [id]
    })

    if (!venta.rows[0]) return null

    const items = await db.execute({
      sql: `
        SELECT vmi.*,
               p.nombre as producto_nombre
        FROM venta_mostrador_items vmi
        LEFT JOIN productos p ON vmi.producto_id = p.id
        WHERE vmi.venta_id = ?
      `,
      args: [id]
    })

    return {
      ...venta.rows[0],
      items: items.rows
    } as unknown as VentaMostrador
  }

  static async create(data: VentaMostrador) {
    const result = await db.execute({
      sql: `
        INSERT INTO ventas_mostrador (admin_id, cliente_id, metodo_pago, total)
        VALUES (?, ?, ?, ?)
      `,
      args: [
        data.admin_id,
        data.cliente_id ?? null,
        data.metodo_pago,
        data.total
      ]
    })

    const ventaId = Number(result.lastInsertRowid)

    if (data.items.length > 0) {
      for (const item of data.items) {
        await db.execute({
          sql: `
            INSERT INTO venta_mostrador_items (venta_id, producto_id, descripcion_libre, cantidad, precio_unitario, subtotal)
            VALUES (?, ?, ?, ?, ?, ?)
          `,
          args: [
            ventaId,
            item.producto_id ?? null,
            item.descripcion_libre ?? null,
            item.cantidad,
            item.precio_unitario,
            item.subtotal
          ]
        })

        if (item.producto_id) {
          await db.execute({
            sql: `
              UPDATE productos
              SET stock = stock - ?
              WHERE id = ? AND stock >= ?
            `,
            args: [item.cantidad, item.producto_id, item.cantidad]
          })
        }
      }
    }

    return result
  }

  static async delete(id: number) {
    const result = await db.execute({
      sql: `DELETE FROM ventas_mostrador WHERE id = ?`,
      args: [id]
    })
    return result
  }
}
