import { createContext } from 'react'

export type ItemCarrito = {
  id: number
  nombre: string
  precio: number
  imagen: string
  cantidad: number
  stock: number
}

export type CarritoContextType = {
  items: ItemCarrito[]
  agregarItem: (item: ItemCarrito) => void
  quitarItem: (id: number) => void
  actualizarCantidad: (id: number, cantidad: number) => void
  vaciarCarrito: () => void
  total: number
  totalItems: number
}

export const CarritoContext = createContext<CarritoContextType | null>(null)
