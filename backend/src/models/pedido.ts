import { db } from '../config/db'
import type { Pedido } from '../types'

export class PedidoModel {
  static async getAll(): Promise<Pedido[]> {
    const result = await db.execute(`
      SELECT p.*,
             c.nombre as cliente_nombre,
             c.telefono as cliente_telefono,
             c.email as cliente_email
      FROM pedidos p
      LEFT JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.created_at DESC
    `)
    return result.rows as unknown as Pedido[]
  }

  static async getById(id: number): Promise<Pedido | null> {
    const pedido = await db.execute({
      sql: `
        SELECT p.*,
               c.nombre as cliente_nombre,
               c.telefono as cliente_telefono,
               c.email as cliente_email
        FROM pedidos p
        LEFT JOIN clientes c ON p.cliente_id = c.id
        WHERE p.id = ?
      `,
      args: [id]
    })

    const items = await db.execute({
      sql: `
        SELECT pi.*,
               p.nombre as producto_nombre,
               p.imagen as producto_imagen
        FROM pedido_items pi
        JOIN productos p ON pi.producto_id = p.id
        WHERE pi.pedido_id = ?
      `,
      args: [id]
    })

    if (!pedido.rows[0]) return null

    return {
      ...pedido.rows[0],
      items: items.rows
    } as unknown as Pedido
  }

  static async create(data: Pedido) {
    const result = await db.execute({
      sql: `
        INSERT INTO pedidos (cliente_id, direccion, metodo_pago, comprobante, total)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        data.cliente_id,
        data.direccion,
        data.metodo_pago,
        data.comprobante ?? null,
        data.total
      ]
    })

    const pedidoId = Number(result.lastInsertRowid)

    if (data.items.length > 0) {
      for (const item of data.items) {
        await db.execute({
          sql: `
            INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
            VALUES (?, ?, ?, ?, ?)
          `,
          args: [
            pedidoId,
            item.producto_id,
            item.cantidad,
            item.precio_unitario,
            item.subtotal
          ]
        })

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

    return result
  }

  static async updateEstado(id: number, estado: string) {
    const result = await db.execute({
      sql: `UPDATE pedidos SET estado = ? WHERE id = ?`,
      args: [estado, id]
    })
    return result
  }

  static async delete(id: number) {
    const result = await db.execute({
      sql: `DELETE FROM pedidos WHERE id = ?`,
      args: [id]
    })
    return result
  }
}
