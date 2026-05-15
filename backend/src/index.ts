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
import { authMiddleware } from './middlewares/auth'




const app = new Elysia()
  .use(cors())
  .get('/', () => ({ message: 'SAM-TECNOLOGÍA API ✅' }))
  
    .use(authRoutes)
  .get('/productos/publicos', async () => {
    const { ProductoModel } = await import('./models/producto')
    return { success: true, data: await ProductoModel.getAll() }
  })
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
    const { CotizacionModel } = await import('./models/cotizacion')
    return { success: true, data: await CotizacionModel.create(body) }
  })
  .post('/pedidos/publico', async ({ body }: any) => {
    const { PedidoModel } = await import('./models/pedido')
    return { success: true, data: await PedidoModel.create(body) }
  })

  .use(authMiddleware)
  .use(uploadRoutes)
  .use(productosRoutes)
  .use(categoriasRoutes)
  .use(serviciosRoutes)
  .use(cotizacionesRoutes)
  .use(pedidosRoutes)
  .use(authRoutes)
  .use(configuracionRoutes)
  
  
  .listen(process.env.PORT ?? 3000)

console.log(`🦊 Elysia corriendo en http://localhost:${app.server?.port}`)