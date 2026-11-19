import { db } from '../config/db/db'
import { clientes, pedidoItems, pedidos, productos } from '../config/db/schema'
import { and, desc, eq, gte, sql } from 'drizzle-orm'
import type { Pedido } from '../types'

export class PedidoModel {
  static async getAll(): Promise<Pedido[]> {
    const rows = await db
      .select({
        id: pedidos.id,
        cliente_id: pedidos.cliente_id,
        direccion: pedidos.direccion,
        metodo_pago: pedidos.metodo_pago,
        comprobante: pedidos.comprobante,
        total: pedidos.total,
        estado: pedidos.estado,
        created_at: pedidos.created_at,
        cliente_nombre: clientes.nombre,
        cliente_telefono: clientes.telefono,
        cliente_email: clientes.email
      })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.cliente_id, clientes.id))
      .orderBy(desc(pedidos.created_at))
    return rows as unknown as Pedido[]
  }

  static async getById(id: number): Promise<Pedido | null> {
    const pedidoRows = await db
      .select({
        id: pedidos.id,
        cliente_id: pedidos.cliente_id,
        direccion: pedidos.direccion,
        metodo_pago: pedidos.metodo_pago,
        comprobante: pedidos.comprobante,
        total: pedidos.total,
        estado: pedidos.estado,
        created_at: pedidos.created_at,
        cliente_nombre: clientes.nombre,
        cliente_telefono: clientes.telefono,
        cliente_email: clientes.email
      })
      .from(pedidos)
      .leftJoin(clientes, eq(pedidos.cliente_id, clientes.id))
      .where(eq(pedidos.id, id))
      .limit(1)

    const pedido = pedidoRows[0]
    if (!pedido) return null

    const items = await db
      .select({
        id: pedidoItems.id,
        pedido_id: pedidoItems.pedido_id,
        producto_id: pedidoItems.producto_id,
        cantidad: pedidoItems.cantidad,
        precio_unitario: pedidoItems.precio_unitario,
        subtotal: pedidoItems.subtotal,
        producto_nombre: productos.nombre,
        producto_imagen: productos.imagen
      })
      .from(pedidoItems)
      .innerJoin(productos, eq(pedidoItems.producto_id, productos.id))
      .where(eq(pedidoItems.pedido_id, id))

    return {
      ...pedido,
      items
    } as unknown as Pedido
  }

  static async create(data: Pedido) {
    return await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(pedidos)
        .values({
          cliente_id: data.cliente_id,
          direccion: data.direccion,
          metodo_pago: data.metodo_pago,
          comprobante: data.comprobante ?? null,
          total: data.total
        })
        .returning()

      const pedidoId = inserted[0]!.id

      if (data.items.length > 0) {
        for (const item of data.items) {
          await tx.insert(pedidoItems).values({
            pedido_id: pedidoId,
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario,
            subtotal: item.subtotal
          })

          await tx
            .update(productos)
            .set({ stock: sql`stock - ${item.cantidad}` })
            .where(
              and(
                eq(productos.id, item.producto_id),
                gte(productos.stock, item.cantidad)
              )
            )
        }
      }

      return inserted[0]
    })
  }

  static async updateEstado(id: number, estado: string) {
    return await db
      .update(pedidos)
      .set({ estado })
      .where(eq(pedidos.id, id))
  }

  static async delete(id: number) {
    return await db.delete(pedidos).where(eq(pedidos.id, id))
  }
}
