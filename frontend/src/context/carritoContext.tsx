import { useState } from 'react'
import type { ReactNode } from 'react'
import { CarritoContext } from './carritoStore'
import type { ItemCarrito } from './carritoStore'

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([])

  const agregarItem = (item: ItemCarrito) => {
    setItems(prev => {
      const existe = prev.find(i => i.id === item.id)
      if (existe) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, cantidad: Math.min(i.cantidad + 1, i.stock) }
            : i
        )
      }
      return [...prev, { ...item, cantidad: 1 }]
    })
  }

  const quitarItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) {
      quitarItem(id)
      return
    }
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, cantidad: Math.min(cantidad, i.stock) } : i
      )
    )
  }

  const vaciarCarrito = () => setItems([])

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0)

  return (
    <CarritoContext.Provider value={{
      items,
      agregarItem,
      quitarItem,
      actualizarCantidad,
      vaciarCarrito,
      total,
      totalItems
    }}>
      {children}
    </CarritoContext.Provider>
  )
}
