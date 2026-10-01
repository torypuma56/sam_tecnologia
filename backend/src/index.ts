import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { productosRoutes } from './routes/productos'
import { categoriasRoutes } from './routes/categorias'
import { serviciosRoutes } from './routes/servicios'
import { cotizacionesRoutes } from './routes/cotizaciones'
import { pedidosRoutes } from './routes/pedidos'
import { authRoutes } from './routes/auth'
import { configuracionRoutes } from './routes/configuracion'
import { uploadRoutes } from './routes/upload'
import { clientesRoutes } from './routes/clientes'
import { ventasMostradorRoutes } from './routes/ventas_mostrador'
import { authMiddleware } from './middlewares/auth'

const app = new Elysia()
  .use(cors())
  .get('/', () => ({ message: 'SAM-TECNOLOGÍA API ✅' }))
  .onError(({ code, error }) => {
    console.error(`Error ${code}:`, error)
    return { success: false, message: 'Error interno del servidor' }
  })

  // ✅ Rutas públicas
  .use(authRoutes)
  .get('/productos/nuevos', async () => {
    const { ProductoModel } = await import('./models/producto')
    return { success: true, data: await ProductoModel.getNuevos() }
  })
  .get('/servicios/publicos', async () => {
    const { ServicioModel } = await import('./models/servicio')
    return { success: true, data: await ServicioModel.getAll() }
  })
  .get('/configuracion/publica', async () => {
    const { ConfiguracionModel } = await import('./models/configuracion')
    return { success: true, data: await ConfiguracionModel.get() }
  })
  .post('/cotizaciones/publica', async ({ body }: any) => {
    const { ClienteModel } = await import('./models/cliente')
    const { CotizacionModel } = await import('./models/cotizacion')
    const clienteId = await ClienteModel.findOrCreate({
      nombre: body.nombre,
      telefono: body.telefono,
      email: body.email
    })
    const cotizacionData = {
      cliente_id: clienteId,
      mensaje: body.mensaje,
      items: body.items
    }
    return { success: true, data: await CotizacionModel.create(cotizacionData) }
  })
  .post('/pedidos/publico', async ({ body }: any) => {
    const { ClienteModel } = await import('./models/cliente')
    const { PedidoModel } = await import('./models/pedido')
    const clienteId = await ClienteModel.findOrCreate({
      nombre: body.nombre,
      telefono: body.telefono,
      email: body.email
    })
    const pedidoData = {
      cliente_id: clienteId,
      direccion: body.direccion,
      metodo_pago: body.metodo_pago,
      comprobante: body.comprobante,
      total: body.total,
      items: body.items
    }
    return { success: true, data: await PedidoModel.create(pedidoData) }
  })

  // 🔒 Rutas protegidas
  .use(authMiddleware)
  .use(uploadRoutes)
  .use(productosRoutes)
  .use(categoriasRoutes)
  .use(serviciosRoutes)
  .use(cotizacionesRoutes)
  .use(pedidosRoutes)
  .use(configuracionRoutes)
  .use(clientesRoutes)
  .use(ventasMostradorRoutes)

  .listen(process.env.PORT ?? 3000)

console.log(`🦊 Elysia corriendo en http://localhost:${app.server?.port}`)
