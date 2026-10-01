import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type BusquedaContextType = {
  busqueda: string
  setBusqueda: (valor: string) => void
  categoriaSeleccionada: number | null
  setCategoriaSeleccionada: (id: number | null) => void
}

const BusquedaContext = createContext<BusquedaContextType | null>(null)

export function BusquedaProvider({ children }: { children: ReactNode }) {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null)

  return (
    <BusquedaContext.Provider value={{
      busqueda,
      setBusqueda,
      categoriaSeleccionada,
      setCategoriaSeleccionada
    }}>
      {children}
    </BusquedaContext.Provider>
  )
}

export const useBusqueda = () => {
  const context = useContext(BusquedaContext)
  if (!context) throw new Error('useBusqueda debe usarse dentro de BusquedaProvider')
  return context
}