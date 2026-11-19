import { sql } from 'drizzle-orm'
import { check, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AnySQLiteColumn } from 'drizzle-orm/sqlite-core'

export const admin = sqliteTable('admin', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  rol: text('rol').notNull().default('admin'),
  estado: text('estado').notNull().default('activo'),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`)
}, (t) => [
  check('admin_rol_check', sql`rol IN ('admin','editor','viewer')`),
  check('admin_estado_check', sql`estado IN ('activo','inactivo')`)
])

export const productos = sqliteTable('productos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion').notNull(),
  categoria_id: integer('categoria_id').notNull().references((): AnySQLiteColumn => categorias.id),
  precio: real('precio').notNull(),
  imagen: text('imagen').notNull(),
  stock: integer('stock').notNull().default(0),
  estado: text('estado').notNull().default('activo'),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`)
}, (t) => [
  check('productos_precio_check', sql`precio > 0`),
  check('productos_stock_check', sql`stock >= 0`),
  check('productos_estado_check', sql`estado IN ('activo','inactivo')`)
])

export const categorias = sqliteTable('categorias', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull().unique(),
  imagen_producto_id: integer('imagen_producto_id').references((): AnySQLiteColumn => productos.id, { onDelete: 'set null' }),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`)
})

export const servicios = sqliteTable('servicios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion').notNull(),
  icono: text('icono').notNull(),
  precio_referencial: real('precio_referencial'),
  estado: text('estado').notNull().default('activo'),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`)
}, (t) => [
  check('servicios_precio_referencial_check', sql`precio_referencial > 0`),
  check('servicios_estado_check', sql`estado IN ('activo','inactivo')`)
])

export const clientes = sqliteTable('clientes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  telefono: text('telefono').notNull(),
  email: text('email').notNull().unique(),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`)
})

export const pedidos = sqliteTable('pedidos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  cliente_id: integer('cliente_id').notNull().references(() => clientes.id),
  direccion: text('direccion').notNull(),
  metodo_pago: text('metodo_pago').notNull().default('efectivo'),
  comprobante: text('comprobante'),
  total: real('total').notNull(),
  estado: text('estado').notNull().default('pendiente'),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`)
}, (t) => [
  check('pedidos_metodo_pago_check', sql`metodo_pago IN ('efectivo','qr')`),
  check('pedidos_total_check', sql`total > 0`),
  check('pedidos_estado_check', sql`estado IN ('pendiente','confirmado','enviado','entregado','cancelado')`)
])

export const pedidoItems = sqliteTable('pedido_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pedido_id: integer('pedido_id').notNull().references(() => pedidos.id, { onDelete: 'cascade' }),
  producto_id: integer('producto_id').notNull().references(() => productos.id),
  cantidad: integer('cantidad').notNull(),
  precio_unitario: real('precio_unitario').notNull(),
  subtotal: real('subtotal').notNull()
}, (t) => [
  check('pedido_items_cantidad_check', sql`cantidad > 0`),
  check('pedido_items_precio_unitario_check', sql`precio_unitario > 0`),
  check('pedido_items_subtotal_check', sql`subtotal = cantidad * precio_unitario`)
])

export const cotizaciones = sqliteTable('cotizaciones', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  cliente_id: integer('cliente_id').notNull().references(() => clientes.id),
  mensaje: text('mensaje').notNull(),
  estado: text('estado').notNull().default('pendiente'),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`)
}, (t) => [
  check('cotizaciones_estado_check', sql`estado IN ('pendiente','respondida','cancelada')`)
])

export const cotizacionItems = sqliteTable('cotizacion_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  cotizacion_id: integer('cotizacion_id').notNull().references(() => cotizaciones.id, { onDelete: 'cascade' }),
  producto_id: integer('producto_id').references(() => productos.id),
  servicio_id: integer('servicio_id').references(() => servicios.id),
  cantidad: integer('cantidad').notNull().default(1)
}, (t) => [
  check('cotizacion_items_cantidad_check', sql`cantidad > 0`),
  check('cotizacion_items_producto_servicio_check', sql`(producto_id IS NOT NULL AND servicio_id IS NULL) OR (producto_id IS NULL AND servicio_id IS NOT NULL)`)
])

export const configuracion = sqliteTable('configuracion', {
  id: integer('id').primaryKey(),
  whatsapp: text('whatsapp').notNull(),
  qr_imagen: text('qr_imagen'),
  updated_by: integer('updated_by').references(() => admin.id, { onDelete: 'set null' }),
  updated_at: text('updated_at').notNull().default(sql`(datetime('now'))`)
}, (t) => [
  check('configuracion_id_check', sql`id = 1`)
])
