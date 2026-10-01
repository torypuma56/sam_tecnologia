# sam_tecnologia

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.13. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Stack

- Frontend: React + TypeScript + Vite + CSS Modules
- Backend: Elysia.js + Bun
- BD: Turso (SQLite)
- Imágenes: Cloudinary
- Auth: JWT

## Estructura

- frontend/src/components/ → navbar, hero, servicios, productos, carrito, checkout, cotizacion, contacto, footer, whatsapp, pagoQr
- frontend/src/admin/ → login, dashboard, secciones (productos, servicios, cotizaciones, pedidos, categorias, configuracion)
- frontend/src/context/ → carritoContext, busquedaContext
- frontend/src/config/ → api.ts
- backend/src/models/ → producto, categoria, servicio, pedido, cotizacion, admin, configuracion
- backend/src/controllers/ → mismos
- backend/src/routes/ → mismos + upload + auth
- backend/src/middlewares/ → auth.ts
- backend/src/config/ → db.ts

## BD Turso

- 10 tablas: categorias, productos, servicios, pedidos, pedido_items, cotizaciones, cotizacion_items, ventas, admin, configuracion

## Pendientes

- Modo oscuro por defecto
- Favicon y SEO
- Políticas de privacidad en footer
- Deploy
