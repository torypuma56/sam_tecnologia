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
  nombre: string
  telefono: string
  email: string
  direccion: string
  metodo_pago: string
  comprobante?: string
  total: number
  estado?: string
  items: PedidoItem[]
  created_at?: string
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
  nombre: string
  telefono: string
  email: string
  mensaje: string
  estado?: string
  items: CotizacionItem[]
  created_at?: string
}

export type Admin = {
  id?: number
  email: string
  password: string
  created_at?: string
}

export type Configuracion = {
  id?: number
  whatsapp: string
  qr_imagen?: string
  updated_at?: string
}