import { db } from '../config/db/db'
import { clientes, cotizacionItems, cotizaciones, productos, servicios } from '../config/db/schema'
import { desc, eq } from 'drizzle-orm'
import type { Cotizacion } from '../types'

export class CotizacionModel {
  static async getAll(): Promise<Cotizacion[]> {
    const rows = await db
      .select({
        id: cotizaciones.id,
        cliente_id: cotizaciones.cliente_id,
        mensaje: cotizaciones.mensaje,
        estado: cotizaciones.estado,
        created_at: cotizaciones.created_at,
        cliente_nombre: clientes.nombre,
        cliente_telefono: clientes.telefono,
        cliente_email: clientes.email
      })
      .from(cotizaciones)
      .leftJoin(clientes, eq(cotizaciones.cliente_id, clientes.id))
      .orderBy(desc(cotizaciones.created_at))
    return rows as unknown as Cotizacion[]
  }

  static async getById(id: number): Promise<Cotizacion | null> {
    const cotRows = await db
      .select({
        id: cotizaciones.id,
        cliente_id: cotizaciones.cliente_id,
        mensaje: cotizaciones.mensaje,
        estado: cotizaciones.estado,
        created_at: cotizaciones.created_at,
        cliente_nombre: clientes.nombre,
        cliente_telefono: clientes.telefono,
        cliente_email: clientes.email
      })
      .from(cotizaciones)
      .leftJoin(clientes, eq(cotizaciones.cliente_id, clientes.id))
      .where(eq(cotizaciones.id, id))
      .limit(1)

    const cotizacion = cotRows[0]
    if (!cotizacion) return null

    const items = await db
      .select({
        id: cotizacionItems.id,
        cotizacion_id: cotizacionItems.cotizacion_id,
        producto_id: cotizacionItems.producto_id,
        servicio_id: cotizacionItems.servicio_id,
        cantidad: cotizacionItems.cantidad,
        producto_nombre: productos.nombre,
        servicio_nombre: servicios.nombre
      })
      .from(cotizacionItems)
      .leftJoin(productos, eq(cotizacionItems.producto_id, productos.id))
      .leftJoin(servicios, eq(cotizacionItems.servicio_id, servicios.id))
      .where(eq(cotizacionItems.cotizacion_id, id))

    return {
      ...cotizacion,
      items
    } as unknown as Cotizacion
  }

  static async create(data: Cotizacion) {
    return await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(cotizaciones)
        .values({
          cliente_id: data.cliente_id,
          mensaje: data.mensaje
        })
        .returning()

      const cotizacionId = inserted[0]!.id

      if (data.items.length > 0) {
        await tx.insert(cotizacionItems).values(
          data.items.map((item) => ({
            cotizacion_id: cotizacionId,
            producto_id: item.producto_id ?? null,
            servicio_id: item.servicio_id ?? null,
            cantidad: item.cantidad
          }))
        )
      }

      return inserted[0]
    })
  }

  static async updateEstado(id: number, estado: string) {
    return await db
      .update(cotizaciones)
      .set({ estado })
      .where(eq(cotizaciones.id, id))
  }

  static async delete(id: number) {
    return await db.delete(cotizaciones).where(eq(cotizaciones.id, id))
  }
}
