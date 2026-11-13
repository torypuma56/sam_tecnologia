import { createContext } from 'react'

export type BusquedaContextType = {
  busqueda: string
  setBusqueda: (valor: string) => void
  categoriaSeleccionada: number | null
  setCategoriaSeleccionada: (id: number | null) => void
}

export const BusquedaContext = createContext<BusquedaContextType | null>(null)
