export type Cliente = {
  id?: number
  nombre: string
  telefono: string
  email: string
  created_at?: string
}

export type Producto = {
  id?: number
  nombre: string
  descripcion: string
  categoria_id: number
  precio: number
  imagen: string
  stock: number
  estado?: string
  created_at?: string
}

export type Categoria = {
  id?: number
  nombre: string
  imagen_producto_id?: number
  created_at?: string
}

export type Servicio = {
  id?: number
  nombre: string
  descripcion: string
  icono: string
  precio_referencial?: number
  estado?: string
  created_at?: string
}

export type PedidoItem = {
  id?: number
  pedido_id?: number
  producto_id: number
  cantidad: number
  precio_unitario: number
  subtotal: number
}

export type Pedido = {
  id?: number
  cliente_id: number
  direccion: string
  metodo_pago: string
  comprobante?: string
  total: number
  estado?: string
  items: PedidoItem[]
  created_at?: string
  // Campos del cliente (via JOIN)
  cliente_nombre?: string
  cliente_telefono?: string
  cliente_email?: string
}

export type CotizacionItem = {
  id?: number
  cotizacion_id?: number
  producto_id?: number
  servicio_id?: number
  cantidad: number
}

export type Cotizacion = {
  id?: number
  cliente_id: number
  mensaje: string
  estado?: string
  items: CotizacionItem[]
  created_at?: string
  // Campos del cliente (via JOIN)
  cliente_nombre?: string
  cliente_telefono?: string
  cliente_email?: string
}

export type Admin = {
  id?: number
  email: string
  password: string
  rol?: string
  estado?: string
  created_at?: string
}

export type Configuracion = {
  id?: number
  whatsapp: string
  qr_imagen?: string
  updated_by?: number
  updated_at?: string
}

export type VentaMostradorItem = {
  id?: number
  venta_id?: number
  producto_id?: number
  descripcion_libre?: string
  cantidad: number
  precio_unitario: number
  subtotal: number
}

export type VentaMostrador = {
  id?: number
  admin_id: number
  cliente_id?: number
  metodo_pago: string
  total: number
  items: VentaMostradorItem[]
  created_at?: string
}
